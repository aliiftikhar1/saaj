import { routes } from "@/lib";
import Image from "next/image";
import Link from "next/link";

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

  const isOnSale = compareAtPrice != null && compareAtPrice > price;
  const discountPercent = isOnSale
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <Link
      id={id}
      href={slug ? `${routes.product}/${slug}` : `${routes.product}/${id}`}
      className="group flex flex-col w-full"
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
        <Image
          src={primaryImageUrl}
          alt={name}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className="object-cover w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />

        {/* Hover Image */}
        <Image
          src={hoverImageUrl}
          alt={`${name} - alternate view`}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
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
                ${price.toFixed(2)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-07 line-through">
                ${compareAtPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xs sm:text-sm text-neutral-09">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
