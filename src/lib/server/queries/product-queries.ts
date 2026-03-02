import { unstable_cache } from "next/cache";

import { OrderStatus, Product, ProductCategoryEnum } from "@prisma/client";
import { ServerActionResponse } from "@/types/server";
import {
  ProductDashboardStats,
  ProductGetAllCounts,
  ProductWithSizes,
} from "@/types/client";
import { wrapServerCall } from "../helpers";
import { prisma } from "@/lib/prisma";
import { CACHE_TAG_PRODUCT } from "@/lib/constants/cache-tags";
import { SIZE_TEMPLATES, SIZE_TYPES } from "@/lib/constants";

// === STATIC PAGE QUERIES ===
const getThreeLatestProductsCached = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return products;
  },
  [CACHE_TAG_PRODUCT, "latest-three"],
  { tags: [CACHE_TAG_PRODUCT] },
);

export async function getThreeLatestProducts(): Promise<
  ServerActionResponse<Product[]>
> {
  return wrapServerCall(async () => {
    const products = await getThreeLatestProductsCached();

    return products;
  });
}

const getThreeRandomProductsCache = unstable_cache(
  async (currentSlug: string) => {
    const products = await prisma.product.findMany({
      where: { isActive: true, slug: { not: currentSlug } },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return products;
  },
  [CACHE_TAG_PRODUCT, "random-three"],
  { tags: [CACHE_TAG_PRODUCT] },
);

export async function getThreeRandomProducts(
  id: string,
): Promise<ServerActionResponse<Product[]>> {
  return wrapServerCall(async () => {
    const products = await getThreeRandomProductsCache(id);

    return products;
  });
}
const getAllProductsWithTotalSoldCached = unstable_cache(
  async (): Promise<ProductGetAllCounts[]> => {
    const products = await prisma.product.findMany({
      include: {
        cartItems: {
          include: {
            cart: {
              include: {
                order: {
                  select: {
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return products.map((product) => {
      // Sum up total sold from cart items where cart has an order that's not cancelled/refunded
      const totalSold = product.cartItems.reduce((sum, item) => {
        const order = item.cart.order;
        if (
          order &&
          order.status !== OrderStatus.CANCELLED &&
          order.status !== OrderStatus.REFUNDED
        ) {
          return sum + item.quantity;
        }
        return sum;
      }, 0);

      return {
        ...product,
        price: Number(product.price),
        totalSold,
      };
    });
  },
  [CACHE_TAG_PRODUCT, "total-sold"],
  { tags: [CACHE_TAG_PRODUCT] },
);

export async function getAllProductsWithTotalSold(): Promise<
  ServerActionResponse<ProductGetAllCounts[]>
> {
  return wrapServerCall(async () => {
    const products = await getAllProductsWithTotalSoldCached();

    return products;
  });
}

export async function getProductsByCategory(
  category?: string,
): Promise<ServerActionResponse<Product[]>> {
  return wrapServerCall(async () => {
    const products = await prisma.product.findMany({
      where: category
        ? { category: category as ProductCategoryEnum, isActive: true }
        : { isActive: true },
    });

    return products;
  });
}

// === DYNAMIC PAGE QUERIES ===
export async function getProductById(
  id: string,
): Promise<ServerActionResponse<Product | null>> {
  return wrapServerCall(async () => {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    return product;
  });
}

export async function getProductBySlug(
  slug: string,
): Promise<ServerActionResponse<ProductWithSizes | null>> {
  return wrapServerCall(async () => {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        sizes: true,
      },
    });

    if (!product) return null;

    // Get the appropriate size order for this product's size type
    const sizeOrder = product.sizeType
      ? SIZE_TEMPLATES[product.sizeType as keyof typeof SIZE_TEMPLATES]
      : SIZE_TEMPLATES[SIZE_TYPES.STANDARD];

    // Sort sizes based on the template order
    product.sizes.sort((a, b) => {
      const aIndex = sizeOrder.indexOf(a.label);
      const bIndex = sizeOrder.indexOf(b.label);

      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });

    return {
      ...product,
      price: Number(product.price),
    };
  });
}

export async function getDashboardProductStats(): Promise<
  ServerActionResponse<ProductDashboardStats>
> {
  return wrapServerCall(async () => {
    const [totalProducts, activeProducts, lowStockCount] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.size.count({
        where: {
          stockTotal: {
            lte: 5,
          },
        },
      }),
    ]);

    return {
      totalProducts,
      activeProducts,
      lowStockProducts: lowStockCount,
    };
  });
}
