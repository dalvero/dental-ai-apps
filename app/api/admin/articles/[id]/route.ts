import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get("x-user-role");

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang diizinkan." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, category, author, status } = body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(author && { author }),
        ...(status && { status: status === "DRAFT" ? "DRAFT" : "PUBLISHED" }),
      },
    });

    const formatted = {
      id: updated.id,
      title: updated.title,
      category: updated.category,
      author: updated.author,
      publishedDate: updated.publishedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: updated.status,
      views: updated.views,
    };

    const response: ApiResponse = {
      success: true,
      message: "Artikel berhasil diperbarui.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("PUT /api/admin/articles/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userRole = request.headers.get("x-user-role");

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang diizinkan." },
        { status: 403 }
      );
    }

    const { id } = await params;

    await prisma.article.delete({ where: { id } });

    const response: ApiResponse = {
      success: true,
      message: "Artikel berhasil dihapus.",
      data: null,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/admin/articles/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
