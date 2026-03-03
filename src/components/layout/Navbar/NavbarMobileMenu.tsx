"use client";

import Link from "next/link";
import { cn } from "@/lib";
import type { NavItemType } from "./types";

import { CheveronRightIcon, CheveronLeftIcon } from "@/components";

// === MOBILE MENU MAIN COMPONENT ===
type NavbarMobileMenuProps = {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  activeSubMenu?: string | null;
  setActiveSubMenu: (subMenu: string | null) => void;
  navItems: NavItemType[];
  isActive: (href: string) => boolean;
};

export function NavbarMobileMenu({
  showMobileMenu,
  setShowMobileMenu,
  activeSubMenu,
  setActiveSubMenu,
  navItems,
  isActive,
}: NavbarMobileMenuProps) {
  const isSubMenuActive = activeSubMenu !== null;
  const activeSubItem = navItems.find((item) => item.id === activeSubMenu);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          showMobileMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => {
          setShowMobileMenu(false);
          setActiveSubMenu(null);
        }}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-white md:hidden",
          "transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          showMobileMenu ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-[56px] border-b border-neutral-03/60">
            {isSubMenuActive ? (
              <button
                onClick={() => setActiveSubMenu(null)}
                className="flex items-center gap-1 text-[13px] text-neutral-10 hover:text-neutral-12 transition-colors cursor-pointer"
              >
                <CheveronLeftIcon />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-[13px] font-medium text-neutral-10 tracking-[-0.01em] uppercase">
                Menu
              </span>
            )}
            <button
              onClick={() => {
                setShowMobileMenu(false);
                setActiveSubMenu(null);
              }}
              className="text-[13px] text-neutral-10 hover:text-neutral-12 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Nav content */}
          <div className="flex-1 overflow-y-auto py-2">
            {/* Root menu */}
            {!isSubMenuActive && (
              <div className="flex flex-col">
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <button
                        key={item.id}
                        className={cn(
                          "flex items-center justify-between w-full px-6 py-3.5 transition-colors cursor-pointer",
                          isActive(item.href)
                            ? "text-neutral-12"
                            : "text-neutral-10 hover:text-neutral-12",
                        )}
                        onClick={() => setActiveSubMenu(item.id)}
                      >
                        <span className="text-[15px] tracking-[-0.02em] font-normal">
                          {item.text}
                        </span>
                        <CheveronRightIcon />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={cn(
                        "flex items-center px-6 py-3.5 transition-colors",
                        isActive(item.href)
                          ? "text-neutral-12"
                          : "text-neutral-10 hover:text-neutral-12",
                      )}
                    >
                      <span className="text-[15px] tracking-[-0.02em] font-normal">
                        {item.text}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Submenu */}
            {isSubMenuActive && activeSubItem?.subItems && (
              <div className="flex flex-col">
                {activeSubItem.subItems.map((subItem, index) => (
                  <div key={subItem.id} className="flex flex-col">
                    {index > 0 && (
                      <div className="mx-6 border-t border-neutral-03/60" />
                    )}
                    <p className="px-6 pt-4 pb-1 text-[11px] font-medium uppercase tracking-[0.04em] text-neutral-08">
                      {subItem.text}
                    </p>
                    {subItem.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setShowMobileMenu(false)}
                        className="px-6 py-3 text-[15px] tracking-[-0.02em] text-neutral-10 hover:text-neutral-12 transition-colors"
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

