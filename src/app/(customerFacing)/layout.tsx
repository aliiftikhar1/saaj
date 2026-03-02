import React from "react";
import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import { CartCountProvider, CartDialogProvider } from "@/providers";
import { getCartItemCount } from "@/lib/server/actions";
import { AddToCartDialog } from "@/components/common/AddToCartDialog/AddToCartDialog";

export const metadata: Metadata = {
  title: {
    default: "Store",
    template: "%s | Cartelle",
  },
};

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartCountProvider fetchCartItemCount={getCartItemCount}>
      <CartDialogProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <AddToCartDialog />
      </CartDialogProvider>
    </CartCountProvider>
  );
}
