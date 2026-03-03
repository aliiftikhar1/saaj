"use client";

import { useCartDialog, useCartSidebar } from "@/providers";
import { AddToCartDialogUI } from "./AddToCartDialogUI";
import { CheckoutButton } from "@/components/common/CheckoutButton/CheckoutButton";

export function AddToCartDialog() {
  const { dialogOpen, dialogProduct, hideDialog } = useCartDialog();
  const { openSidebar } = useCartSidebar();

  if (!dialogProduct) return null;

  const handleViewCart = () => {
    hideDialog();
    openSidebar();
  };

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
      onViewCart={handleViewCart}
      checkoutButton={<CheckoutButton onOpenChange={hideDialog} />}
    />
  );
}
