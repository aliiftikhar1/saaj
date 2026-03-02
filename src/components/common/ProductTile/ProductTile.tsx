import { routes } from "@/lib";
import Image from "next/image";
import Link from "next/link";

type ProductTileProps = {
  id: string;
  name: string;
  price: number;
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
    primaryImageUrl,
    hoverImageUrl,
    priority = false,
    slug = "",
  } = props;

  return (
    <Link
      id={id}
      href={slug ? `${routes.product}/${slug}` : `${routes.product}/${id}`}
      className="group relative flex flex-col gap-3 w-full"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm">
        {/* Primary Image */}
        <Image
          src={primaryImageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
        />

        {/* Hover Image */}
        <Image
          src={hoverImageUrl}
          alt={`${name} - alternate view`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"
        />

        {/* View Button Overlay */}
        <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
          <button className="bg-black h-12 w-12 text-sm text-white p-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
            View
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg text-neutral-12 line-clamp-2 font-medium">
          {name}
        </p>
        <p className="text-base text-neutral-10 ">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
