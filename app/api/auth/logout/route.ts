import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { ApiResponse } from "@/types/api";

export async function POST() {
  try {
    const response: ApiResponse = {
      success: true,
      message: "Logout berhasil.",
    };

    const res = NextResponse.json(response, { status: 200 });

    // Hapus session_token cookie dengan mengeset maxAge = 0
    res.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat logout." },
      { status: 500 }
    );
  }
}
