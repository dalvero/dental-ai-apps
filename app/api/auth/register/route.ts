import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";
import { ApiResponse } from "@/types/api";
import bcrypt from "bcryptjs";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password }: RegisterRequestBody = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Nama minimal 2 karakter." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password minimal 8 karakter." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PARENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Auto-login: langsung buat session setelah register berhasil
    const token = await signToken({
      userId: newUser.id,
      role: newUser.role as "ADMIN" | "PARENT",
    });

    const response: ApiResponse = {
      success: true,
      message: "Registrasi berhasil.",
      data: newUser,
    };

    const res = NextResponse.json(response, { status: 201 });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return res;
  } catch (error) {
    console.error("Register error:", error);

    const response: ApiResponse = {
      success: false,
      message: "Terjadi kesalahan pada server.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}