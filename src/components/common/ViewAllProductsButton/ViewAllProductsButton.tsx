"use client";

import Link from "next/link";
import { useState } from "react";
import { getButtonStyles } from "@/components";
import { routes } from "@/lib";

type ViewAllProductsButtonProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function ViewAllProductsButton({
  className,
  variant = "light",
}: ViewAllProductsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      href={routes.shop}
      className={getButtonStyles(variant, className)}
      onClick={() => setIsLoading(true)}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" />
          Loading...
        </span>
      ) : (
        "View all products"
      )}
    </Link>
  );
}
