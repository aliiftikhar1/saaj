"use client";

import { useEffect } from "react";

import { NavbarUI } from "./NavbarUI";
import { useCartCount } from "@/providers";

export function Navbar() {
  // === CART CONTEXT ===
  const { itemCount, refreshCartCount } = useCartCount();

  // === EFFECTS ===
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return <NavbarUI itemCount={itemCount} />;
}
