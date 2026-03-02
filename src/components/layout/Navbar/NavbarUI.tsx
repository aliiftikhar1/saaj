"use client";

import Link from "next/link";
import { useState } from "react";

import { cn, routes } from "@/lib";

import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarSubMenu } from "./NavbarSubMenu";
import { navItems } from "./lib";

import {
  CheckoutIcon,
  CheveronLeftIcon,
  MenuBarIcon,
  CloseIcon,
  CustomLink,
} from "@/components";

export type NavbarUIProps = {
  itemCount: number;
};

export function NavbarUI({ itemCount }: NavbarUIProps) {
  // === STATE ===
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  return (
    <div className="sticky top-0 left-0 w-full z-40 bg-white">
      <nav className="mx-auto px-5 py-2 md:px-10 xl:px-12 md:py-3 flex justify-between items-center relative bg-white z-20">
        <>
          <button
            aria-label="Go Back"
            className={cn(
              showMobileMenu && activeSubMenu !== null
                ? "opacity-100"
                : "opacity-0 hidden pointer-events-none",
              "p-3 -m-3.5 transition-opacity duration-300 ease-in-out cursor-pointer",
              showMobileMenu ? "will-change-opacity" : "will-change-auto",
            )}
            onClick={() => setActiveSubMenu(null)}
          >
            <CheveronLeftIcon />
          </button>
          <Link className="p-3 -ms-3" href={routes.home}>
            <h4
              className={cn(
                showMobileMenu && "opacity-0",
                "transition-opacity duration-300 ease-in-out",
                showMobileMenu ? "will-change-opacity" : "will-change-auto",
              )}
            >
              Cartelle
            </h4>
          </Link>
        </>

        <div className="gap-3 items-center hidden md:flex">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseLeave={() => setShowSubMenu(false)}
                >
                  <CustomLink
                    onMouseEnter={() => setShowSubMenu(true)}
                    href={item.href}
                    text={item.text}
                  />
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-3 ${showSubMenu ? "pointer-events-auto" : "pointer-events-none"}`}
                    onMouseLeave={() => setShowSubMenu(false)}
                  >
                    <NavbarSubMenu
                      show={showSubMenu}
                      subItems={item.subItems}
                      onClose={() => setShowSubMenu(false)}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <CustomLink key={item.id} href={item.href} text={item.text} />
              );
            }
          })}
        </div>

        <div className="flex items-center text-neutral-12">
          {/* === TOD DO: ADD SEARCH ICON === */}

          <Link
            href={routes.cart}
            aria-label="Cart"
            className={cn(
              "p-3 relative cursor-pointer transition-opacity duration-300 ease-in-out",
              showMobileMenu ? "opacity-0 pointer-events-none" : "opacity-100",
              showMobileMenu ? "will-change-opacity" : "will-change-auto",
            )}
          >
            <CheckoutIcon />
            {itemCount > 0 && (
              <div className="absolute flex items-center justify-center bg-neutral-12 rounded-full w-3.5 h-3.5 top-0 right-0 mt-1.5 me-1.5">
                <span className="text-[9px] font-medium text-neutral-00">
                  {itemCount < 9 ? itemCount : "9+"}
                </span>
              </div>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setActiveSubMenu(null);
            }}
            className={cn("p-3 cursor-pointer relative", "md:hidden")}
          >
            <MenuBarIcon className={`${showMobileMenu ? "hidden" : "block"}`} />
            <CloseIcon className={`${showMobileMenu ? "block" : "hidden"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <NavbarMobileMenu
        activeSubMenu={activeSubMenu}
        setActiveSubMenu={setActiveSubMenu}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </div>
  );
}
