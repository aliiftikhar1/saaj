"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

type ShopFilterBarProps = {
  totalProducts: number;
};

export function ShopFilterBar({ totalProducts }: ShopFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("q") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentSort = searchParams.get("sort") || "";

  const [search, setSearch] = useState(currentSearch);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: search });
  };

  const handlePriceFilter = () => {
    updateParams({ minPrice, maxPrice });
  };

  const handleSortChange = (sort: string) => {
    updateParams({ sort });
  };

  const handleClearAll = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters = currentSearch || currentMinPrice || currentMaxPrice || currentSort;

  return (
    <div className="w-full space-y-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-08"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-04 rounded-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2.5 text-sm font-medium bg-black text-white rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Price Range */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-08 font-medium">Price:</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            min="0"
            step="0.01"
            className="w-20 px-2 py-1.5 text-sm border border-neutral-04 rounded-sm focus:outline-none focus:border-black"
          />
          <span className="text-neutral-08">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            min="0"
            step="0.01"
            className="w-20 px-2 py-1.5 text-sm border border-neutral-04 rounded-sm focus:outline-none focus:border-black"
          />
          <button
            type="button"
            onClick={handlePriceFilter}
            disabled={isPending}
            className="px-3 py-1.5 text-xs font-medium bg-neutral-02 hover:bg-neutral-03 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            Go
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-neutral-08 font-medium">Sort:</span>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-2 py-1.5 text-sm border border-neutral-04 rounded-sm focus:outline-none focus:border-black bg-white cursor-pointer"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Active Filters & Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-08">
          {totalProducts} {totalProducts === 1 ? "product" : "products"}
          {isPending && " (loading...)"}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
