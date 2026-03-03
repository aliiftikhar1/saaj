/**
 * Seed the initial Super Admin account
 * Run: npx tsx prisma/seed-admin.ts
 */

import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "crypto";

const prisma = new PrismaClient();

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const SUPER_ADMIN_EMAIL = "admin@saajtradition.com";
  const SUPER_ADMIN_PASSWORD = "saaj2026";
  const SUPER_ADMIN_NAME = "Super Admin";

  console.log("Seeding super admin account...\n");

  const existing = await prisma.adminUser.findUnique({
    where: { email: SUPER_ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`Super admin "${SUPER_ADMIN_EMAIL}" already exists, skipping.`);
  } else {
    await prisma.adminUser.create({
      data: {
        email: SUPER_ADMIN_EMAIL,
        name: SUPER_ADMIN_NAME,
        passwordHash: hashPassword(SUPER_ADMIN_PASSWORD),
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    console.log("Super Admin created successfully!");
    console.log(`  Email:    ${SUPER_ADMIN_EMAIL}`);
    console.log(`  Password: ${SUPER_ADMIN_PASSWORD}`);
    console.log(`  Role:     SUPER_ADMIN`);
  }

  console.log("\nDone!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
