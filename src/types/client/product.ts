import z from "zod";

// === ENUMS ===
export const ProductCategoryEnum = z.enum([
  "DRESSES",
  "OUTERWEAR",
  "TOPS_BOTTOMS",
  "BAGS_ACCESSORIES",
  "SHOES",
]);

export type ProductCategoryEnum = z.infer<typeof ProductCategoryEnum>;

export const SizeTypeEnum = z.enum(["Standard", "ShoeSize", "OneSize"]);
export type SizeTypeEnum = z.infer<typeof SizeTypeEnum>;

// === PRODUCT WITH ORDER ITEM COUNTS ===
export type ProductGetAllCounts = {
  id: string;
  name: string;
  description: string;
  price: number; // Converted from Decimal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  category: string;
  sizeType: string | null;
  totalSold: number;
};

// === PRODUCT WITH SIZES ===
export type ProductWithSizes = {
  id: string;
  name: string;
  description: string;
  price: number; // Converted from Decimal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  category: string;
  sizeType: string | null;
  sizes: Array<{
    id: string;
    label: string;
    productId: string;
    stockTotal: number;
    stockReserved: number;
  }>;
};

// === DASHBOARD STATS ===
export type ProductDashboardStats = {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
};
