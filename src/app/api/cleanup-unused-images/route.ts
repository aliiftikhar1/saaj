import { prisma } from "@/lib/prisma";
import { BLOB_STORAGE_PREFIXES } from "@/lib";
import { cleanupUnusedBlobs } from "@/lib/utils";
import { NextResponse } from "next/server";

/*

    This CRON job cleans up unused images from blob storage for all resources:
    - Author avatars
    - Blog images
    - Product images

*/

export async function GET() {
  try {
    const results = {
      authors: { deleted: 0, errors: 0 },
      blogs: { deleted: 0, errors: 0 },
      products: { deleted: 0, errors: 0 },
    };

    // Clean up author images
    try {
      const authors = await prisma.author.findMany({
        select: { avatarUrl: true },
      });

      const validAuthorUrls = new Set(authors.map((a) => a.avatarUrl));

      const authorResult = await cleanupUnusedBlobs({
        prefix: BLOB_STORAGE_PREFIXES.AUTHORS,
        validUrls: validAuthorUrls,
        resourceName: "author",
      });

      const authorData = await authorResult.json();
      results.authors = authorData;
    } catch (error) {
      console.error("Error cleaning up author images:", error);
      results.authors.errors = 1;
    }

    // Clean up blog images
    try {
      const blogs = await prisma.blogPost.findMany({
        select: { blogImageUrl: true },
      });

      const validBlogUrls = new Set(blogs.map((b) => b.blogImageUrl));

      const blogResult = await cleanupUnusedBlobs({
        prefix: BLOB_STORAGE_PREFIXES.BLOGS,
        validUrls: validBlogUrls,
        resourceName: "blog",
      });

      const blogData = await blogResult.json();
      results.blogs = blogData;
    } catch (error) {
      console.error("Error cleaning up blog images:", error);
      results.blogs.errors = 1;
    }

    // Clean up product images
    try {
      const products = await prisma.product.findMany({
        select: { images: true },
      });

      const validProductUrls = new Set(products.flatMap((p) => p.images));

      const productResult = await cleanupUnusedBlobs({
        prefix: BLOB_STORAGE_PREFIXES.PRODUCTS,
        validUrls: validProductUrls,
        resourceName: "product",
      });

      const productData = await productResult.json();
      results.products = productData;
    } catch (error) {
      console.error("Error cleaning up product images:", error);
      results.products.errors = 1;
    }

    const totalDeleted =
      results.authors.deleted +
      results.blogs.deleted +
      results.products.deleted;
    const totalErrors =
      results.authors.errors + results.blogs.errors + results.products.errors;

    return NextResponse.json(
      {
        success: true,
        message: `Cleanup complete. Total deleted: ${totalDeleted}, Total errors: ${totalErrors}`,
        details: results,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cleanup job failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Cleanup job failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
