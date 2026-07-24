import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";
import { ApiResponse } from "@/types/api";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: user.id,
      role: user.role as "ADMIN" | "PARENT",
    });

    const response: ApiResponse = {
      success: true,
      message: "Login berhasil.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    const res = NextResponse.json(response, { status: 200 });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);

    const response: ApiResponse = {
      success: false,
      message: "Terjadi kesalahan pada server.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}