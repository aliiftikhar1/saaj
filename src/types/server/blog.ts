import { Prisma } from "@prisma/client";

// === BLOGS MUTATION INPUT ===
export type BlogMutationInput = { id: string };

// === BLOG POST BY SLUG WITH AUTHOR INFO ===
export type BlogPostWithAuthor = Prisma.BlogPostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        avatarUrl: true;
        occupation: true;
      };
    };
  };
}>;
