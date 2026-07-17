import { hash } from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionStringValue = process.env.DATABASE_URL;
const usernameValue = process.env.ADMIN_USERNAME?.trim().toLowerCase();
const emailValue = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "admin@veraninpazari.local";
const passwordValue = process.env.ADMIN_PASSWORD;

if (!connectionStringValue) throw new Error("DATABASE_URL gerekli.");
if (!usernameValue || !passwordValue || passwordValue.length < 8) {
  throw new Error("ADMIN_USERNAME ve en az 8 karakterli ADMIN_PASSWORD gerekli.");
}

const connectionString: string = connectionStringValue;
const username: string = usernameValue;
const email: string = emailValue;
const password: string = passwordValue;

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

async function main() {
  const passwordHash = await hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: { username, passwordHash, isActive: true },
    create: { username, email, name: "Vera'nın Pazarı Admin", passwordHash },
  });

  console.info(`Admin hesabı hazırlandı: ${username}`);
}

main()
  .finally(async () => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
