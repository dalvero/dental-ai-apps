import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const parentPassword = await bcrypt.hash("parent123", 10);

  // Seed Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@dentalai.com" },
    update: {},
    create: {
      name: "Admin Dental AI",
      email: "admin@dentalai.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Seed Parent + 1 Child
  const parent = await prisma.user.upsert({
    where: { email: "parent@dentalai.com" },
    update: {},
    create: {
      name: "John Wick",
      email: "parent@dentalai.com",
      password: parentPassword,
      role: "PARENT",
      children: {
        create: [
          {
            name: "Ares",
            birthDate: new Date("2018-05-14"),
            gender: "MALE",
          },
        ],
      },
    },
  });

  // Seed Initial Education Materials
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.create({
      data: {
        title: "Making brushing fun for toddlers",
        description: "Discover 5 proven techniques to turn the bedtime battle into a game your kids will love...",
        imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        type: "VIDEO",
        sourceUrl: "https://youtube.com/watch?v=sample_video",
        category: "Parenting Guide",
        readTime: "4 min read",
        hasQuiz: true,
        quizQuestions: {
          create: [
            {
              question: "Berapa lama durasi menyikat gigi yang dianjurkan?",
              options: ["30 Detik", "1 Menit", "2 Menit", "5 Menit"],
              correctAnswer: 2,
            },
            {
              question: "Berapa kali sebaiknya anak menyikat gigi dalam sehari?",
              options: ["1 Kali", "2 Kali (Pagi & Malam)", "3 Kali", "Tidak Perlu"],
              correctAnswer: 1,
            },
          ],
        },
      },
    });

    await prisma.education.create({
      data: {
        title: "Buku Saku Demineralisasi & Spot Gigi Anak (PDF)",
        description: "Panduan teknis pencegahan awal karies dan deteksi dini berbintik putih pada gigi anak balita.",
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        type: "DOCUMENT",
        sourceUrl: "panduan_karies_dini_v1.pdf",
        category: "Pencegahan Karies",
        readTime: "6 min read",
        hasQuiz: false,
      },
    });
  }

  console.log("Seed selesai:");
  console.log({ admin: admin.email, parent: parent.email });
}

main()
  .catch((e) => {
    console.error("Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });