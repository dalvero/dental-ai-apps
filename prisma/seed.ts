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