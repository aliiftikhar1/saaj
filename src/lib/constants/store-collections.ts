/**
 * Category type for client-side use.
 * Categories are now fetched from the database via getAllCategories().
 *
 * This file is kept for backward compatibility. Use getAllCategories() from
 * "@/lib/server/queries" in server components, or pass categories as props.
 */

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  imageUrl: string;
  sortOrder: number;
};

/**
 * @deprecated Use getAllCategories() from "@/lib/server/queries" instead.
 * This empty array exists only to prevent import errors during migration.
 */
export const PRODUCT_CATEGORIES: CategoryItem[] = [];

/** @deprecated Use getAllCategories() from "@/lib/server/queries" instead. */
export const STORE_COLLECTIONS = PRODUCT_CATEGORIES;
