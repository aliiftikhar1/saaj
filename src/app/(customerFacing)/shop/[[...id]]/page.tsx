import {
  AnimatedHeadingText,
  BaseSection,
  ProductTile,
  ShopSidebar,
  ShopFilterBar,
} from "@/components";
import type { Metadata } from "next";
import Link from "next/link";

import { getProductsByCategorySlug, getProductsByCollectionSlug, getCollections, getAllCategories } from "@/lib/server/queries";

const PRODUCTS_PER_PAGE = 12;

const getShopPageMeta = (
  id?: string[],
  collections?: { name: string; tagline: string | null; slug: string }[],
  categories?: { name: string; slug: string }[],
): { title: string; description: string } => {
  const DEFAULT_TITLE = "Explore Our Shop";
  const DEFAULT_DESCRIPTION =
    "Discover handpicked products crafted with care and passion.";

  if (id && id.length === 2) {
    const [type, slug] = id;

    if (type === "categories") {
      const category = categories?.find((c) => c.slug === slug);
      return {
        title: category?.name ?? DEFAULT_TITLE,
        description: category ? `Browse our ${category.name} collection.` : DEFAULT_DESCRIPTION,
      };
    }

    const storeCollection = collections?.find(
      (collection) => slug === collection.slug,
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

    if (subpage === "categories") {
      return {
        title: "Shop Categories",
        description: "Browse products by category.",
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
  const [collectionsRes, categoriesRes] = await Promise.all([getCollections(), getAllCategories()]);
  const collections = collectionsRes.success ? collectionsRes.data : [];
  const categories = categoriesRes.success ? categoriesRes.data : [];
  const { title } = getShopPageMeta(id, collections, categories);

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
    page?: string;
  }>;
}) {
  // === PARAMS ===
  const { id } = await params;
  const filters = await searchParams;
  const currentPage = Math.max(1, parseInt(filters.page ?? "1", 10) || 1);

  // Determine if this is a collection page (/shop/collections/slug)
  const isCollectionPage = id && id.length === 2 && id[0] === "collections";
  const collectionSlug = isCollectionPage ? id[1] : undefined;

  // === FETCHES (parallel) ===
  const [productsResult, collectionsRes, categoriesRes] = await Promise.all([
    collectionSlug
      ? getProductsByCollectionSlug(collectionSlug, currentPage, PRODUCTS_PER_PAGE)
      : getProductsByCategorySlug(
          id && id.length === 2 && id[0] === "categories"
            ? id[1]
            : undefined,
          currentPage,
          PRODUCTS_PER_PAGE,
        ),
    getCollections(),
    getAllCategories(),
  ]);
  const collections = collectionsRes.success ? collectionsRes.data : [];
  const categories = categoriesRes.success ? categoriesRes.data : [];

  const { title, description } = getShopPageMeta(id, collections, categories);

  // === EXTRACT DATA ===
  let filteredProducts = productsResult.success ? [...productsResult.data.products] : [];
  const totalProducts = productsResult.success ? productsResult.data.total : 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // === CLIENT-SIDE FILTER & SORT (on the current page) ===
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

  // Build pagination href helper
  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sort) params.set("sort", filters.sort);
    if (page > 1) params.set("page", String(page));
    const base = id ? `/shop/${id.join("/")}` : "/shop";
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  };

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
            categories={categories}
            collectionsOpenByDefault={id && id.length === 2}
          />

          <div className="flex-1">
            <ShopFilterBar totalProducts={totalProducts} />

            {/* ERROR LOADING PRODUCTS */}
            {productsResult.success === false && (
              <p className="text-neutral-8 text-center col-span-full">
                Failed to load products.
              </p>
            )}

            {/* PRODUCTS GRID */}
            {productsResult.success && (
              <>
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

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-center gap-2 pt-10" aria-label="Pagination">
                    {currentPage > 1 && (
                      <Link
                        href={buildPageHref(currentPage - 1)}
                        className="px-3 py-2 text-sm rounded-md border border-neutral-03 text-neutral-09 hover:bg-neutral-02 transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - currentPage) <= 1,
                      )
                      .reduce<(number | "...")[]>((acc, p, i, arr) => {
                        if (i > 0 && p - (arr[i - 1]) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, i) =>
                        item === "..." ? (
                          <span key={`dots-${i}`} className="px-2 text-neutral-07">
                            ...
                          </span>
                        ) : (
                          <Link
                            key={item}
                            href={buildPageHref(item)}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${
                              item === currentPage
                                ? "bg-neutral-12 text-white"
                                : "border border-neutral-03 text-neutral-09 hover:bg-neutral-02"
                            }`}
                          >
                            {item}
                          </Link>
                        ),
                      )}
                    {currentPage < totalPages && (
                      <Link
                        href={buildPageHref(currentPage + 1)}
                        className="px-3 py-2 text-sm rounded-md border border-neutral-03 text-neutral-09 hover:bg-neutral-02 transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </BaseSection>
    </main>
  );
}
