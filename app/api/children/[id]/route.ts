import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";
import { Child, UpdateChildRequest } from "@/types/child";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const userId = request.headers.get("x-user-id");
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const child = await prisma.child.findUnique({ where: { id } });

    if (!child || child.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Data anak tidak ditemukan." },
        { status: 404 }
      );
    }

    const response: ApiResponse<Child> = {
      success: true,
      message: "Data anak berhasil diambil.",
      data: {
        id: child.id,
        name: child.name,
        birthDate: child.birthDate.toISOString(),
        gender: child.gender as Child["gender"],
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Get child by id error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const userId = request.headers.get("x-user-id");
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const existingChild = await prisma.child.findUnique({ where: { id } });

    if (!existingChild || existingChild.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Data anak tidak ditemukan." },
        { status: 404 }
      );
    }

    const body: UpdateChildRequest = await request.json();
    const { name, birthDate, gender } = body;

    if (name !== undefined && name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Nama minimal 2 karakter." },
        { status: 400 }
      );
    }

    if (gender !== undefined && gender !== "MALE" && gender !== "FEMALE") {
      return NextResponse.json(
        { success: false, message: "Gender tidak valid." },
        { status: 400 }
      );
    }

    let parsedBirthDate: Date | undefined;
    if (birthDate !== undefined) {
      parsedBirthDate = new Date(birthDate);
      if (isNaN(parsedBirthDate.getTime()) || parsedBirthDate > new Date()) {
        return NextResponse.json(
          { success: false, message: "Tanggal lahir tidak valid." },
          { status: 400 }
        );
      }
    }

    const updatedChild = await prisma.child.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(parsedBirthDate !== undefined && { birthDate: parsedBirthDate }),
        ...(gender !== undefined && { gender }),
      },
    });

    const response: ApiResponse<Child> = {
      success: true,
      message: "Profil anak berhasil diperbarui.",
      data: {
        id: updatedChild.id,
        name: updatedChild.name,
        birthDate: updatedChild.birthDate.toISOString(),
        gender: updatedChild.gender as Child["gender"],
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Update child error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const userId = request.headers.get("x-user-id");
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const existingChild = await prisma.child.findUnique({ where: { id } });

    if (!existingChild || existingChild.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Data anak tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.child.delete({ where: { id } });

    const response: ApiResponse = {
      success: true,
      message: "Profil anak berhasil dihapus.",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Delete child error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}