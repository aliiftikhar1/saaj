import Link from "next/link";
import type { Metadata } from "next";
import { Button, Navbar } from "@/components";
import { routes } from "@/lib";
import { CartCountProvider, CartDialogProvider, CartSidebarProvider } from "@/providers";
import { getCartItemCount, getCartAction } from "@/lib/server/actions";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <header>
        <CartCountProvider fetchCartItemCount={getCartItemCount}>
          <CartSidebarProvider fetchCart={getCartAction}>
            <CartDialogProvider>
              <Navbar />
            </CartDialogProvider>
          </CartSidebarProvider>
        </CartCountProvider>
      </header>
      <main className="flex items-center my-8 justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-bold text-neutral-11 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-11 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-09 mb-8 max-w-md mx-auto">
            {"The page you're looking for doesn't exist or has been moved."}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={routes.home}>
              <Button text="Go Home" variant="dark" />
            </Link>
            <Link href={routes.shop}>
              <Button text="Browse Shop" variant="light" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
