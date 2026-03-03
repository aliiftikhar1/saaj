import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fix() {
  const cats = await prisma.category.findMany();
  const slugToId = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  // Fix Gold Khussa Flats -> Shoes
  await prisma.product.updateMany({
    where: { slug: "gold-khussa-flats" },
    data: { categoryId: slugToId["shoes"] },
  });
  console.log("Fixed: Gold Khussa Flats -> Shoes");

  // Fix Pearl Jhumka Earrings -> Bags & Accessories
  await prisma.product.updateMany({
    where: { slug: "pearl-jhumka-earrings" },
    data: { categoryId: slugToId["bags-accessories"] },
  });
  console.log("Fixed: Pearl Jhumka Earrings -> Bags & Accessories");

  await prisma.$disconnect();
}

fix();
