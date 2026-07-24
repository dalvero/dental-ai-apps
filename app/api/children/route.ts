import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";
import { Child, CreateChildRequest } from "@/types/child";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body: CreateChildRequest = await request.json();
    const { name, birthDate, gender } = body;

    if (!name || !birthDate || !gender) {
      return NextResponse.json(
        { success: false, message: "Semua data wajib diisi." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Nama minimal 2 karakter." },
        { status: 400 }
      );
    }

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime()) || parsedBirthDate > new Date()) {
      return NextResponse.json(
        { success: false, message: "Tanggal lahir tidak valid." },
        { status: 400 }
      );
    }

    if (gender !== "MALE" && gender !== "FEMALE") {
      return NextResponse.json(
        { success: false, message: "Gender tidak valid." },
        { status: 400 }
      );
    }

    const child = await prisma.child.create({
      data: {
        name,
        birthDate: parsedBirthDate,
        gender,
        userId,
      },
    });

    const response: ApiResponse<Child> = {
      success: true,
      message: "Profil anak berhasil dibuat.",
      data: {
        id: child.id,
        name: child.name,
        birthDate: child.birthDate.toISOString(),
        gender: child.gender as Child["gender"],
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Create child error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const children = await prisma.child.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const response: ApiResponse<Child[]> = {
      success: true,
      message: "Data anak berhasil diambil.",
      data: children.map((child) => ({
        id: child.id,
        name: child.name,
        birthDate: child.birthDate.toISOString(),
        gender: child.gender as Child["gender"],
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Get children error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}