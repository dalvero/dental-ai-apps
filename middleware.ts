import { NextRequest, NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE_NAME } from "@/lib/auth";

// Route API yang wajib login untuk diakses
const PROTECTED_API_PREFIXES = ["/api/children", "/api/auth/me", "/api/admin"];

// Route halaman yang wajib login untuk diakses
const PROTECTED_PAGE_PREFIXES = ["/add-child", "/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Jika membuka halaman admin login
  if (pathname === "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const payload = token ? await verifyToken(token) : null;
    if (payload && payload.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const isProtectedApi = PROTECTED_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isProtectedPage = PROTECTED_PAGE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtectedApi && !isProtectedPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    if (isProtectedApi) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }
    // Jika mencoba akses halaman admin tanpa token, redirect ke /admin/login
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika mengakses API/halaman admin tapi role bukan ADMIN
  if ((pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) && payload.role !== "ADMIN") {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang diizinkan." },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Teruskan userId & role ke route handler lewat header,
  // supaya API tidak perlu verifikasi token ulang.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-role", payload.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/api/children/:path*",
    "/api/auth/me",
    "/api/admin/:path*",
    "/add-child/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};