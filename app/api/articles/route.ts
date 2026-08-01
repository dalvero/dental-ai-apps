import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse, Article } from "@/types";

export async function GET() {
  try {
    const items = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    const formatted: Article[] = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      category: item.category,
      author: item.author,
      publishedDate: item.publishedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: item.status,
      views: item.views,
      readTime: item.readTime || "3 min read",
      content: item.content || "",
    }));

    const response: ApiResponse<Article[]> = {
      success: true,
      message: "Berhasil mengambil data artikel.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
