"use client";

import { routes } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type ProductTileProps = {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  primaryImageUrl: string;
  hoverImageUrl: string;
  priority?: boolean;
  slug?: string;
};

export function ProductTile(props: ProductTileProps) {
  // === PROPS ===
  const {
    id,
    name,
    price,
    compareAtPrice,
    primaryImageUrl,
    hoverImageUrl,
    priority = false,
    slug = "",
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [primaryFailed, setPrimaryFailed] = useState(!primaryImageUrl);
  const [hoverFailed, setHoverFailed] = useState(!hoverImageUrl);

  const isOnSale = compareAtPrice != null && compareAtPrice > price;
  const discountPercent = isOnSale
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <Link
      id={id}
      href={slug ? `${routes.product}/${slug}` : `${routes.product}/${id}`}
      className="group flex flex-col w-full"
      onClick={() => setIsLoading(true)}
    >
      {/* Image Container */}
      <div className="relative aspect-[5/6] overflow-hidden bg-neutral-02 rounded-sm">
        {/* Sale Badge */}
        {isOnSale && (
          <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded">
            -{discountPercent}%
          </span>
        )}

        {/* Primary Image */}
        {!primaryFailed ? (
          <Image
            src={primaryImageUrl}
            alt={name}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            className="object-cover w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            onError={() => setPrimaryFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 group-hover:opacity-0 transition-opacity duration-500">
            <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}

        {/* Hover Image */}
        {!hoverFailed && hoverImageUrl && (
          <Image
            src={hoverImageUrl}
            alt={`${name} - alternate view`}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
            onError={() => setHoverFailed(true)}
          />
        )}

        {/* Hover "View" circular button */}
        <div className="absolute inset-0 flex items-end justify-end p-2.5 pointer-events-none">
          <div
            className={`
              flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md
              transition-all duration-300 ease-out
              opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
            `}
          >
            <ArrowUpRight className="w-4 h-4 text-neutral-900" strokeWidth={2} />
          </div>
        </div>

        {/* Click loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            <div className="w-6 h-6 rounded-full border-2 border-neutral-300 border-t-neutral-900 animate-spin" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-2 pb-1 flex flex-col gap-0.5">
        <p className="text-xs sm:text-sm text-neutral-11 truncate leading-tight">
          {name}
        </p>
        <div className="flex items-center gap-1.5">
          {isOnSale ? (
            <>
              <span className="text-xs sm:text-sm font-medium text-red-600">
                Rs.{price.toFixed(2)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-07 line-through">
                Rs.{compareAtPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xs sm:text-sm text-neutral-09">
              Rs.{price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
