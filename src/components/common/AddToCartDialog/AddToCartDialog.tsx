"use client";

import { useCartDialog } from "@/providers";
import { AddToCartDialogUI } from "./AddToCartDialogUI";
import { CheckoutButton } from "@/components/common/CheckoutButton/CheckoutButton";

export function AddToCartDialog() {
  const { dialogOpen, dialogProduct, hideDialog } = useCartDialog();

  if (!dialogProduct) return null;

  return (
    <AddToCartDialogUI
      open={dialogOpen}
      onOpenChange={hideDialog}
      productName={dialogProduct.productName}
      price={dialogProduct.price}
      imageUrl={dialogProduct.imageUrl}
      size={dialogProduct.size}
      category={dialogProduct.category}
      quantity={dialogProduct.quantity}
      checkoutButton={<CheckoutButton onOpenChange={hideDialog} />}
    />
  );
}
