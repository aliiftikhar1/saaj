"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition, useRef, useEffect } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib";

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
  const [showFilters, setShowFilters] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  // Live search: debounce 350ms after each keystroke
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Read current URL at fire-time to avoid stale closure on searchParams
      const params = new URLSearchParams(window.location.search);
      if (search) params.set("q", search);
      else params.delete("q");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, pathname, router]);

  const handlePriceApply = () => {
    updateParams({ minPrice, maxPrice });
  };

  const handleSortChange = (sort: string) => {
    updateParams({ sort });
  };

  const handleClearAll = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    startTransition(() => router.push(pathname, { scroll: false }));
  };

  const hasActiveFilters =
    currentSearch || currentMinPrice || currentMaxPrice || currentSort;

  return (
    <div className="w-full mb-6 flex flex-col gap-2">
      {/* Row 1: Search + Sort */}
      <div className="flex items-center gap-2">
        {/* Live Search */}
        <div className="relative flex-1">
          {isPending && search !== "" ? (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-neutral-04 border-t-neutral-09 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-07 pointer-events-none" />
          )}
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-8.5 pr-8 py-2 text-sm border border-neutral-04 rounded-sm bg-white focus:outline-none focus:border-neutral-09 transition-colors placeholder:text-neutral-06"
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); searchInputRef.current?.focus(); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-06 hover:text-neutral-10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Price filter toggle (mobile: icon button) */}
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 text-xs border rounded-sm transition-colors cursor-pointer shrink-0",
            showFilters || currentMinPrice || currentMaxPrice
              ? "border-neutral-09 bg-neutral-09 text-white"
              : "border-neutral-04 text-neutral-08 hover:border-neutral-09 hover:text-neutral-10 bg-white",
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Price</span>
          {(currentMinPrice || currentMaxPrice) && (
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 sm:hidden" />
          )}
        </button>

        {/* Sort */}
        <div className="relative shrink-0">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none pl-3 pr-7 py-2 text-xs border border-neutral-04 rounded-sm bg-white focus:outline-none focus:border-neutral-09 transition-colors cursor-pointer text-neutral-08 hover:text-neutral-10"
          >
            <option value="">Sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">A → Z</option>
            <option value="name-desc">Z → A</option>
            <option value="newest">Newest</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-07 pointer-events-none" />
        </div>
      </div>

      {/* Row 2: Price filter (collapsible) */}
      {showFilters && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-01 border border-neutral-03 rounded-sm">
          <span className="text-xs text-neutral-07 font-medium shrink-0">Price</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePriceApply()}
            placeholder="Min"
            min="0"
            step="1"
            className="w-20 px-2 py-1 text-xs border border-neutral-04 rounded-sm bg-white focus:outline-none focus:border-neutral-09"
          />
          <span className="text-neutral-05 text-xs">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePriceApply()}
            placeholder="Max"
            min="0"
            step="1"
            className="w-20 px-2 py-1 text-xs border border-neutral-04 rounded-sm bg-white focus:outline-none focus:border-neutral-09"
          />
          <button
            type="button"
            onClick={handlePriceApply}
            disabled={isPending}
            className="px-3 py-1 text-xs font-medium bg-neutral-09 text-white rounded-sm hover:bg-neutral-11 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}

      {/* Row 3: Count + clear */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-07">
          {isPending ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-neutral-05 border-t-neutral-09 animate-spin inline-block" />
              Loading...
            </span>
          ) : (
            `${totalProducts} ${totalProducts === 1 ? "product" : "products"}`
          )}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-xs text-neutral-07 hover:text-neutral-10 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

