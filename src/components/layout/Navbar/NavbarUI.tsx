"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

import { cn, routes } from "@/lib";
import { useCartSidebar } from "@/providers";

import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarSubMenu } from "./NavbarSubMenu";
import { getNavItems } from "./lib";
import type { NavItemType } from "./types";

import { CheckoutIcon, MenuBarIcon, CloseIcon } from "@/components";

export type NavbarUIProps = {
  itemCount: number;
  collections?: { id: string; name: string; slug: string }[];
};

export function NavbarUI({ itemCount, collections = [] }: NavbarUIProps) {
  // === STATE ===
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathName, setLastPathName] = useState("");

  const pathName = usePathname();
  const navItems: NavItemType[] = getNavItems(collections);
  const { openSidebar } = useCartSidebar();

  // === SCROLL DETECTION for frosted glass effect ===
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (derived state pattern)
  if (pathName !== lastPathName) {
    setLastPathName(pathName);
    if (showMobileMenu) {
      setShowMobileMenu(false);
      setActiveSubMenu(null);
    }
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const isActive = useCallback(
    (href: string) => {
      if (href === routes.home) return pathName === href;
      return pathName.startsWith(href);
    },
    [pathName],
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-white backdrop-blur-none",
        )}
      >
        <nav className="mx-auto max-w-[1750px] px-5 md:px-10 xl:px-12 flex items-center justify-between h-[56px] md:h-[60px]">
          {/* Left: Logo */}
          <Link
            href={routes.home}
            className="flex items-center shrink-0 group"
          >
            <span className="text-[18px] md:text-[20px] font-medium tracking-[-0.04em] text-neutral-12 transition-opacity duration-200 group-hover:opacity-60">
              Saaj Tradition
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseLeave={() => setShowSubMenu(false)}
                  >
                    <button
                      onMouseEnter={() => setShowSubMenu(true)}
                      onClick={() => setShowSubMenu(!showSubMenu)}
                      className={cn(
                        "px-3.5 py-1.5 text-[13px] tracking-[-0.01em] rounded-full transition-colors duration-200 cursor-pointer",
                        isActive(item.href)
                          ? "text-neutral-12 font-medium"
                          : "text-neutral-09 hover:text-neutral-12 font-normal",
                      )}
                    >
                      {item.text}
                    </button>
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-3",
                        showSubMenu
                          ? "pointer-events-auto"
                          : "pointer-events-none",
                      )}
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
              }
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 text-[13px] tracking-[-0.01em] rounded-full transition-colors duration-200",
                    isActive(item.href)
                      ? "text-neutral-12 font-medium"
                      : "text-neutral-09 hover:text-neutral-12 font-normal",
                  )}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>

          {/* Right: Cart + Mobile Toggle */}
          <div className="flex items-center gap-0 shrink-0">
            <button
              onClick={openSidebar}
              aria-label="Cart"
              className={cn(
                "relative p-2.5 rounded-full transition-all duration-200 hover:bg-neutral-12/[0.04] cursor-pointer",
                showMobileMenu && "opacity-0 pointer-events-none",
              )}
            >
              <CheckoutIcon />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-neutral-12 text-white text-[9px] font-medium leading-none">
                  {itemCount < 99 ? itemCount : "99+"}
                </span>
              )}
            </button>

            <button
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setActiveSubMenu(null);
              }}
              className="p-2.5 rounded-full transition-all duration-200 hover:bg-neutral-12/[0.04] cursor-pointer md:hidden"
            >
              {showMobileMenu ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuBarIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <NavbarMobileMenu
        activeSubMenu={activeSubMenu}
        setActiveSubMenu={setActiveSubMenu}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        navItems={navItems}
        isActive={isActive}
      />
    </>
  );
}
