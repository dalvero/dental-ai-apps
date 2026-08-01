import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan." },
        { status: 400 }
      );
    }

    // Validasi tipe file gambar
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File harus berupa gambar (JPG, PNG, WebP, GIF)." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Folder tujuan penyimpan di public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || ".jpg";
    const filename = `edu_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: "Gambar lokal berhasil diunggah.",
      url: publicUrl,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah file gambar lokal." },
      { status: 500 }
    );
  }
}
