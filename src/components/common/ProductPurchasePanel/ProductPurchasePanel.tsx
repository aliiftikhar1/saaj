"use client";

import { useState } from "react";

import { useCartCount, useCartDialog } from "@/providers";
import { ProductWithSizes } from "@/types/client";
import { ProductPurchasePanelUI } from "./ProductPurchasePanelUI";
import { screamingSnakeToTitle } from "@/lib";
import { addToCart } from "@/lib/server/actions";

type ProductPurchasePanelProps = {
  product: ProductWithSizes;
  defaultSize?: string;
};

export function ProductPurchasePanel(props: ProductPurchasePanelProps) {
  // === PROPS ===
  const { product, defaultSize } = props;

  // === STATE ===
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // === CONTEXT ===
  const { showDialog } = useCartDialog();
  const { refreshCartCount } = useCartCount();

  // === FUNCTIONS ===
  const handleAddToCart = async (sizeId: string, sizeLabel: string) => {
    setIsLoading(true);

    try {
      const result = await addToCart({
        productId: product.id,
        sizeId,
        quantity: 1,
      });

      if (!result.success) {
        setIsError(true);
        return;
      }

      showDialog({
        productName: product.name,
        price: product.price.toString(),
        imageUrl: product.images[0],
        size: sizeLabel,
        category: screamingSnakeToTitle(product.category),
        quantity: result.data.quantity,
      });
      setIsError(false);
    } finally {
      setIsLoading(false);
      refreshCartCount();
    }
  };

  return (
    <ProductPurchasePanelUI
      isLoading={isLoading}
      isError={isError}
      product={product}
      onAddToCart={handleAddToCart}
      defaultSize={defaultSize}
    />
  );
}
