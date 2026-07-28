import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";
import { Child } from "@/types/child";

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  children: Child[];
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Token tidak ditemukan." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        children: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            birthDate: true,
            gender: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    const formattedChildren: Child[] = user.children.map((child) => ({
      id: child.id,
      name: child.name,
      birthDate: child.birthDate.toISOString(),
      gender: child.gender as Child["gender"],
    }));

    const response: ApiResponse<UserProfileResponse> = {
      success: true,
      message: "Data profil user berhasil diambil.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        children: formattedChildren,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
