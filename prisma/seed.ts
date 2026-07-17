import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionStringValue = process.env.DATABASE_URL;
const emailValue = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const passwordValue = process.env.ADMIN_PASSWORD;

if (!connectionStringValue) throw new Error("DATABASE_URL gerekli.");
if (!emailValue || !passwordValue || passwordValue.length < 12) {
  throw new Error("ADMIN_EMAIL ve en az 12 karakterli ADMIN_PASSWORD gerekli.");
}

const connectionString: string = connectionStringValue;
const email: string = emailValue;
const password: string = passwordValue;

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

async function main() {
  const passwordHash = await hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, isActive: true },
    create: { email, name: "Vera'nın Pazarı Admin", passwordHash },
  });

  console.info(`Admin hesabı hazırlandı: ${email}`);
}

main()
  .finally(async () => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
