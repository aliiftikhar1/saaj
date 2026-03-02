// === ENUMS ===
export enum BlogCategory {
  TRENDS = "TRENDS",
  SUSTAINABILITY = "SUSTAINABILITY",
  STYLE_GUIDES = "STYLE_GUIDES",
  DESIGNERS = "DESIGNERS",
  FASHION_NEWS = "FASHION_NEWS",
}

// === MODELS ===
export type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  content: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  duration: number;
  blogImageUrl: string;
};

export type Author = {
  id: string;
  name: string;
  occupation: string;
  avatarUrl: string;
};
