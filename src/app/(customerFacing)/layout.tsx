import React from "react";
import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import { CartCountProvider, CartDialogProvider, CartSidebarProvider } from "@/providers";
import { getCartItemCount, getCartAction } from "@/lib/server/actions";
import { AddToCartDialog } from "@/components/common/AddToCartDialog/AddToCartDialog";
import { CartSidebar } from "@/components/common/CartSidebar/CartSidebar";
import { getCollections } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: {
    default: "Store",
    template: "%s | Saaj Tradition",
  },
};

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionsResponse = await getCollections();
  const collections = collectionsResponse.success
    ? collectionsResponse.data.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      }))
    : [];

  return (
    <CartCountProvider fetchCartItemCount={getCartItemCount}>
      <CartSidebarProvider fetchCart={getCartAction}>
        <CartDialogProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar collections={collections} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <AddToCartDialog />
          <CartSidebar />
        </CartDialogProvider>
      </CartSidebarProvider>
    </CartCountProvider>
  );
}
