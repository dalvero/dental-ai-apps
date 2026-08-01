import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";

export async function GET(request: Request) {
  try {
    const userRole = request.headers.get("x-user-role");

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang diizinkan." },
        { status: 403 }
      );
    }

    const items = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      author: item.author,
      publishedDate: item.publishedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: item.status,
      views: item.views,
    }));

    const response: ApiResponse = {
      success: true,
      message: "Daftar artikel berhasil diambil.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userRole = request.headers.get("x-user-role");

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang diizinkan." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, category, author, status } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Judul artikel wajib diisi." },
        { status: 400 }
      );
    }

    const newItem = await prisma.article.create({
      data: {
        title,
        category: category || "Kesehatan Gigi",
        author: author || "Dr. Ahmad Rizky",
        status: status === "DRAFT" ? "DRAFT" : "PUBLISHED",
      },
    });

    const formatted = {
      id: newItem.id,
      title: newItem.title,
      category: newItem.category,
      author: newItem.author,
      publishedDate: newItem.publishedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: newItem.status,
      views: newItem.views,
    };

    const response: ApiResponse = {
      success: true,
      message: "Artikel berhasil dibuat.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/articles error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
