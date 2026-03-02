"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routing/routes";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { cn, MAX_CART_ITEM_QUANTITY } from "@/lib";
import { Loader2 } from "lucide-react";

type CartItemCardUIProps = {
  slug: string;
  title: string;
  image: string;
  size: {
    label: string;
  };
  quantity: number;
  unitPrice: number;
  isLoading: boolean;
  error: string | null;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
};

export function CartItemCardUI(props: CartItemCardUIProps) {
  const {
    slug,
    title,
    image,
    size,
    quantity,
    unitPrice,
    isLoading,
    error,
    onIncrement,
    onDecrement,
    onDelete,
  } = props;

  const itemTotal = (unitPrice * quantity).toFixed(2);
  const productUrl = `${routes.product}/${slug}`;

  return (
    <div className="relative border border-neutral-04 rounded-sm p-4 md:p-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-11" />
        </div>
      )}

      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <Link href={productUrl} className="shrink-0">
          <div className="relative h-32 w-32 md:h-40 md:w-40 bg-neutral-3 rounded-md overflow-hidden">
            <Image
              src={image}
              alt={title}
              quality={60}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 160px"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <Link
              href={productUrl}
              className="hover:text-neutral-9 transition-colors"
            >
              <h3 className="text-base md:text-lg font-medium text-neutral-12 truncate">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-neutral-10 mt-1">Size: {size.label}</p>
            <p className="text-base md:text-lg font-medium text-neutral-11 mt-2">
              ${itemTotal}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 border border-neutral-5 rounded-md">
              <button
                onClick={onDecrement}
                disabled={isLoading || quantity <= 1}
                className={cn(
                  "p-2 hover:bg-neutral-02 transition-colors rounded-l-md cursor-pointer",
                  "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                )}
                aria-label="Decrease quantity"
              >
                <MinusIcon className="text-neutral-11" />
              </button>

              <span className="px-4 text-base font-medium text-neutral-11 min-w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={onIncrement}
                disabled={isLoading || quantity >= MAX_CART_ITEM_QUANTITY}
                className={cn(
                  "p-2 hover:bg-neutral-02 transition-colors rounded-r-md cursor-pointer",
                  "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                )}
                aria-label="Increase quantity"
              >
                <PlusIcon className="text-neutral-11" />
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={onDelete}
              disabled={isLoading}
              className={cn(
                "p-2 hover:bg-neutral-02 cursor-pointer transition-colors rounded-md",
                "disabled:opacity-30 disabled:cursor-not-allowed",
              )}
              aria-label="Remove item"
            >
              <TrashIcon className="text-neutral-9" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
