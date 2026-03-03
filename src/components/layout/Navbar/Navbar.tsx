"use client";

import { useEffect } from "react";

import { NavbarUI } from "./NavbarUI";
import { useCartCount } from "@/providers";

type NavbarProps = {
  collections?: { id: string; name: string; slug: string }[];
};

export function Navbar({ collections = [] }: NavbarProps) {
  // === CART CONTEXT ===
  const { itemCount, refreshCartCount } = useCartCount();

  // === EFFECTS ===
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return <NavbarUI itemCount={itemCount} collections={collections} />;
}
