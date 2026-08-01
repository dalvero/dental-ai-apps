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

    const items = await prisma.education.findMany({
      include: {
        quizQuestions: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      type: item.type,
      sourceUrl: item.sourceUrl,
      category: item.category,
      readTime: item.readTime || "3 min read",
      hasQuiz: item.hasQuiz,
      createdAt: item.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      quizQuestions: item.quizQuestions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    }));

    const response: ApiResponse = {
      success: true,
      message: "Data materi edukasi berhasil diambil.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/education error:", error);
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
    const { title, description, imageUrl, type, sourceUrl, category, readTime, hasQuiz } = body;

    if (!title || !sourceUrl) {
      return NextResponse.json(
        { success: false, message: "Judul dan sumber materi wajib diisi." },
        { status: 400 }
      );
    }

    const newItem = await prisma.education.create({
      data: {
        title,
        description: description || null,
        imageUrl: imageUrl || null,
        type: type === "DOCUMENT" ? "DOCUMENT" : "VIDEO",
        sourceUrl,
        category: category || "Kesehatan Gigi Anak",
        readTime: readTime || "3 min read",
        hasQuiz: typeof hasQuiz === "boolean" ? hasQuiz : true,
      },
      include: {
        quizQuestions: true,
      },
    });

    const formatted = {
      id: newItem.id,
      title: newItem.title,
      description: newItem.description || "",
      imageUrl: newItem.imageUrl || "",
      type: newItem.type,
      sourceUrl: newItem.sourceUrl,
      category: newItem.category,
      readTime: newItem.readTime || "3 min read",
      hasQuiz: newItem.hasQuiz,
      createdAt: newItem.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      quizQuestions: [],
    };

    const response: ApiResponse = {
      success: true,
      message: "Materi edukasi berhasil ditambahkan.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/education error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
