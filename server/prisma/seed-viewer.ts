import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const VIEWER_EMAIL = process.env.VIEWER_EMAIL || "demo@vetart.clinic";
const VIEWER_PASSWORD = process.env.VIEWER_PASSWORD;

async function main() {
  if (!VIEWER_PASSWORD) {
    throw new Error("Set VIEWER_PASSWORD before running this script.");
  }

  const passwordHash = await bcrypt.hash(VIEWER_PASSWORD, 10);
  await prisma.adminUser.upsert({
    where: { email: VIEWER_EMAIL },
    create: { email: VIEWER_EMAIL, passwordHash, role: "VIEWER" },
    update: { passwordHash, role: "VIEWER" },
  });
  console.log(`Demo VIEWER account ready: ${VIEWER_EMAIL}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
