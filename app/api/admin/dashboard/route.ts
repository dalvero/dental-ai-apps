import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/api";

export async function GET(request: Request) {
  try {
    const userRole = request.headers.get("x-user-role");

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Hanya admin yang berhak mengakses data." },
        { status: 403 }
      );
    }

    // Hitung total real-time dari database Prisma / Supabase
    const [
      totalParents,
      totalChildren,
      totalEducation,
      totalArticles,
      publishedArticles,
      draftArticles,
      allChildren,
      usersList,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "PARENT" } }),
      prisma.child.count(),
      prisma.education.count(),
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.child.findMany({ select: { birthDate: true } }),
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          children: {
            select: {
              id: true,
              name: true,
              birthDate: true,
              gender: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Hitung real-time demografi usia anak dari tanggal lahir di database
    const now = new Date();
    let balita = 0;    // 0 - 2 tahun
    let usiaDini = 0;  // 3 - 5 tahun
    let anak = 0;      // 6 - 12+ tahun

    allChildren.forEach((child) => {
      const birth = new Date(child.birthDate);
      let age = now.getFullYear() - birth.getFullYear();
      const monthDiff = now.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--;
      }

      if (age < 3) {
        balita++;
      } else if (age >= 3 && age <= 5) {
        usiaDini++;
      } else {
        anak++;
      }
    });

    const formattedUsers = usersList.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      childrenCount: user.children.length,
      joinedDate: user.createdAt.toISOString().split("T")[0],
      status: "ACTIVE" as const,
      children: user.children.map((c) => ({
        id: c.id,
        name: c.name,
        birthDate: c.birthDate.toISOString(),
        gender: c.gender,
      })),
    }));

    const response: ApiResponse = {
      success: true,
      message: "Data real-time dashboard admin berhasil diambil.",
      data: {
        totalParents,
        totalChildren,
        totalEducation,
        totalArticles,
        articleStats: {
          published: publishedArticles,
          draft: draftArticles,
        },
        ageDemographics: {
          balita,
          usiaDini,
          anak,
        },
        users: formattedUsers,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Admin dashboard API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
