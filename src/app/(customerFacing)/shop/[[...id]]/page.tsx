import {
  AnimatedHeadingText,
  BaseSection,
  ProductTile,
  ShopSidebar,
  ShopFilterBar,
} from "@/components";
import type { Metadata } from "next";

import { getProductsByCategorySlug, getProductsByCollectionSlug, getCollections } from "@/lib/server/queries";

const getShopPageMeta = (
  id?: string[],
  collections?: { name: string; tagline: string | null; slug: string }[],
): { title: string; description: string } => {
  const DEFAULT_TITLE = "Explore Our Shop";
  const DEFAULT_DESCRIPTION =
    "Discover handpicked products crafted with care and passion.";

  if (id && id.length === 2) {
    const [, collectionId] = id;
    const storeCollection = collections?.find(
      (collection) => collectionId === collection.slug,
    );

    return {
      title: storeCollection?.name ?? DEFAULT_TITLE,
      description: storeCollection?.tagline ?? DEFAULT_DESCRIPTION,
    };
  }

  if (id && id.length === 1) {
    const [subpage] = id;

    if (subpage === "collections") {
      return {
        title: "Shop Collections",
        description:
          "Explore our curated collections, featuring seasonal and themed selections.",
      };
    }

    return {
      title: "New Arrivals",
      description: "Discover the latest additions to our collection.",
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}): Promise<Metadata> {
  const { id } = await params;
  const collectionsRes = await getCollections();
  const collections = collectionsRes.success ? collectionsRes.data : [];
  const { title } = getShopPageMeta(id, collections);

  return {
    title,
  };
}

// === PAGE ===
export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string[] }>;
  searchParams: Promise<{
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}) {
  // === PARAMS ===
  const { id } = await params;
  const filters = await searchParams;

  // Determine if this is a collection page (/shop/collections/slug)
  const isCollectionPage = id && id.length === 2 && id[0] === "collections";
  const collectionSlug = isCollectionPage ? id[1] : undefined;

  // === FETCHES ===
  const [products, collectionsRes] = await Promise.all([
    collectionSlug
      ? getProductsByCollectionSlug(collectionSlug)
      : getProductsByCategorySlug(
          id && id.length === 2
            ? id[1]
            : undefined,
        ),
    getCollections(),
  ]);
  const collections = collectionsRes.success ? collectionsRes.data : [];

  const { title, description } = getShopPageMeta(id, collections);

  // === FILTER & SORT ===
  let filteredProducts = products.success ? [...products.data] : [];

  // Search filter
  if (filters.q) {
    const query = filters.q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }

  // Price filters
  if (filters.minPrice) {
    const min = parseFloat(filters.minPrice);
    if (!isNaN(min)) {
      filteredProducts = filteredProducts.filter(
        (p) => Number(p.price) >= min,
      );
    }
  }
  if (filters.maxPrice) {
    const max = parseFloat(filters.maxPrice);
    if (!isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        (p) => Number(p.price) <= max,
      );
    }
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }
  }

  return (
    <main>
      <BaseSection id="shop-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text={title}
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">{description}</p>
        </div>
      </BaseSection>

      <BaseSection id="products-section" className="pb-16 xl:pb-20">
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
          <ShopSidebar
            collections={collections}
            collectionsOpenByDefault={id && id.length === 2}
          />

          <div className="flex-1">
            <ShopFilterBar totalProducts={filteredProducts.length} />

            {/* ERROR LOADING PRODUCTS */}
            {products.success === false && (
              <p className="text-neutral-8 text-center col-span-full">
                Failed to load products.
              </p>
            )}

            {/* PRODUCTS GRID */}
            {products.success && (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
                {filteredProducts.length === 0 && (
                  <p className="text-neutral-8 text-center col-span-full">
                    No products found.
                  </p>
                )}
                {filteredProducts.length > 0 &&
                  filteredProducts.map((product, index) => (
                    <ProductTile
                      priority={index < 3}
                      key={product.id}
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      price={Number(product.price)}
                      compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
                      primaryImageUrl={product.images[0]}
                      hoverImageUrl={product.images[1]}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </BaseSection>
    </main>
  );
}
