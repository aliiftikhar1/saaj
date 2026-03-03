import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // List all products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, isFeatured: true },
    orderBy: { createdAt: "desc" },
  });

  console.log("All active products:");
  products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (featured: ${p.isFeatured})`);
  });

  // Mark first 9 products as featured
  const toFeature = products.slice(0, 9);
  for (const p of toFeature) {
    await prisma.product.update({
      where: { id: p.id },
      data: { isFeatured: true },
    });
  }

  console.log(`\nMarked ${toFeature.length} products as featured:`);
  toFeature.forEach((p) => console.log(`  - ${p.name}`));

  await prisma.$disconnect();
}

main().catch(console.error);
