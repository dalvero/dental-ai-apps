import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse, EducationResource } from "@/types";

export async function GET() {
  try {
    const items = await prisma.education.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quizQuestions: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const formatted: EducationResource[] = items.map((item) => ({
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
      quizQuestions: item.hasQuiz
        ? item.quizQuestions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
          }))
        : [],
    }));

    const response: ApiResponse<EducationResource[]> = {
      success: true,
      message: "Berhasil mengambil data materi edukasi.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/education error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
