import {
  AnimatedHeadingText,
  BaseSection,
  ProductTile,
  ShopSidebar,
} from "@/components";
import type { Metadata } from "next";

import { STORE_COLLECTIONS } from "@/lib";
import { getProductsByCategory } from "@/lib/server/queries";

const getShopPageMeta = (
  id?: string[],
): { title: string; description: string } => {
  const DEFAULT_TITLE = "Explore Our Shop";
  const DEFAULT_DESCRIPTION =
    "Discover handpicked products crafted with care and passion.";

  if (id && id.length === 2) {
    const [, collectionId] = id;
    const storeCollection = STORE_COLLECTIONS.find(
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
  const { title } = getShopPageMeta(id);

  return {
    title,
  };
}

// === PAGE ===
export default async function ShopPage({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  // === PARAMS ===
  const { id } = await params;
  const paramCategory =
    id && id.length === 2
      ? id[1].toUpperCase().split("-").join("_")
      : undefined;

  // === FETCHES ===
  const products = await getProductsByCategory(paramCategory);

  const { title, description } = getShopPageMeta(id);

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
            collections={STORE_COLLECTIONS}
            collectionsOpenByDefault={id && id.length === 2}
          />

          {/* ERROR LOADING PRODUCTS */}
          {products.success === false && (
            <p className="text-neutral-8 text-center col-span-full">
              Failed to load products.
            </p>
          )}

          {/* PRODUCTS GRID */}
          {products.success && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
              {products.data.length === 0 && (
                <p className="text-neutral-8 text-center col-span-full">
                  No products found.
                </p>
              )}
              {products.data.length > 0 &&
                products.data.map((product, index) => (
                  <ProductTile
                    priority={index < 3}
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={Number(product.price)}
                    primaryImageUrl={product.images[0]}
                    hoverImageUrl={product.images[1]}
                  />
                ))}
            </div>
          )}
        </div>
      </BaseSection>
    </main>
  );
}
