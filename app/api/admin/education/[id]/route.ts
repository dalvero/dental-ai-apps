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
    const { title, description, imageUrl, type, sourceUrl, category, readTime, hasQuiz, quizQuestions } = body;

    const existing = await prisma.education.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Materi edukasi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Tentukan status akhir hasQuiz
    let finalHasQuiz = existing.hasQuiz;
    if (typeof hasQuiz === "boolean") {
      finalHasQuiz = hasQuiz;
    } else if (Array.isArray(quizQuestions)) {
      finalHasQuiz = quizQuestions.length > 0;
    }

    // Jika hasQuiz dimatikan atau quizQuestions diset kosong, hapus semua soal di DB
    if (!finalHasQuiz || (Array.isArray(quizQuestions) && quizQuestions.length === 0)) {
      await prisma.quizQuestion.deleteMany({ where: { educationId: id } });
      finalHasQuiz = false;
    } else if (Array.isArray(quizQuestions) && quizQuestions.length > 0) {
      await prisma.$transaction([
        prisma.quizQuestion.deleteMany({ where: { educationId: id } }),
        prisma.quizQuestion.createMany({
          data: quizQuestions.map((q: any) => ({
            educationId: id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        }),
      ]);
      finalHasQuiz = true;
    }

    // Update metadata materi
    const updated = await prisma.education.update({
      where: { id },
      data: {
        ...(title && { title }),
        description: typeof description !== "undefined" ? description : existing.description,
        imageUrl: typeof imageUrl !== "undefined" ? imageUrl : existing.imageUrl,
        ...(type && { type: type === "DOCUMENT" ? "DOCUMENT" : "VIDEO" }),
        ...(sourceUrl && { sourceUrl }),
        ...(category && { category }),
        ...(readTime && { readTime }),
        hasQuiz: finalHasQuiz,
      },
      include: {
        quizQuestions: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const formatted = {
      id: updated.id,
      title: updated.title,
      description: updated.description || "",
      imageUrl: updated.imageUrl || "",
      type: updated.type,
      sourceUrl: updated.sourceUrl,
      category: updated.category,
      readTime: updated.readTime || "3 min read",
      hasQuiz: updated.hasQuiz,
      createdAt: updated.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      quizQuestions: updated.quizQuestions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    };

    const response: ApiResponse = {
      success: true,
      message: "Materi edukasi dan kuis berhasil diperbarui.",
      data: formatted,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/admin/education/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
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

    await prisma.education.delete({ where: { id } });

    const response: ApiResponse = {
      success: true,
      message: "Materi edukasi berhasil dihapus.",
      data: null,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("DELETE /api/admin/education/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
