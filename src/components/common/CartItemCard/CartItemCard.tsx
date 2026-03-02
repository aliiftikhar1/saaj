"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartCount } from "@/providers";
import { CartItemWithDetails } from "@/types/client";
import { CartItemCardUI } from "./CartItemCardUI";
import { updateCartItemQuantity, removeCartItem } from "@/lib/server/actions";
import { MAX_CART_ITEM_QUANTITY } from "@/lib";

type CartItemCardProps = {
  item: Omit<CartItemWithDetails, "unitPrice"> & { unitPrice: number };
};

export function CartItemCard(props: CartItemCardProps) {
  // === PROPS ===
  const { item } = props;

  // === STATE ===
  const [optimisticQuantity, setOptimisticQuantity] = useState(item.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === CONTEXT ===
  const { setItemCount } = useCartCount();

  // === HOOKS ===
  const router = useRouter();

  // === FUNCTIONS ===
  const handleQuantityUpdate = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > MAX_CART_ITEM_QUANTITY) {
      return;
    }

    const previousQuantity = optimisticQuantity;
    setOptimisticQuantity(newQuantity);
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateCartItemQuantity({
        cartItemId: item.id,
        quantity: newQuantity,
      });

      if (!result.success) {
        setOptimisticQuantity(previousQuantity);
        setError(result.error || "Failed to update quantity");
        return;
      }

      setItemCount(result.data.quantity);
      router.refresh();
    } catch {
      setOptimisticQuantity(previousQuantity);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = () => {
    handleQuantityUpdate(optimisticQuantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityUpdate(optimisticQuantity - 1);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await removeCartItem({
        cartItemId: item.id,
      });

      if (!result.success) {
        setError(result.error || "Failed to remove item");
        return;
      }

      setItemCount(result.data.quantity);
      router.refresh();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartItemCardUI
      slug={item.slug}
      title={item.title}
      image={item.image}
      size={item.size}
      quantity={optimisticQuantity}
      unitPrice={item.unitPrice}
      isLoading={isLoading}
      error={error}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onDelete={handleDelete}
    />
  );
}
