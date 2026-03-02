"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";

import { CheveronRightIcon } from "@/components";
import { cn } from "@/lib";
import { navItems } from "./lib/constants";
import { useMeasureHeight } from "./hooks";

// === LINE LINK ITEM ===
type NavbarMobileLineItemLinkProps = {
  href: string;
  text: string;
  onClick: () => void;
};

function NavbarMobileLineItemLink({
  href,
  text,
  onClick,
}: NavbarMobileLineItemLinkProps) {
  return (
    <Link href={href} onClick={onClick} className="text-navbar w-full py-3">
      {text}
    </Link>
  );
}

// === LINE BUTTON PARENT ITEM ===
type NavbarMobileParentItemProps = {
  text: string;
  onClick: () => void;
};

function NavbarMobileParentItem({
  text,
  onClick,
}: NavbarMobileParentItemProps) {
  return (
    <button
      className="text-navbar cursor-pointer w-full flex justify-between items-center py-3"
      onClick={onClick}
    >
      <span>{text}</span>
      <CheveronRightIcon />
    </button>
  );
}

// === MOBILE MENU MAIN COMPONENT ===
type NavbarMobileMenuProps = {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  activeSubMenu?: string | null;
  setActiveSubMenu: (subMenu: string | null) => void;
};

export function NavbarMobileMenu({
  showMobileMenu,
  setShowMobileMenu,
  activeSubMenu,
  setActiveSubMenu,
}: NavbarMobileMenuProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentHeight = useMeasureHeight({ ref: contentRef });

  const isSubMenuActive = activeSubMenu !== null;

  return (
    <>
      <motion.div
        className={cn(
          "bg-white absolute top-full left-0 right-0 md:hidden shadow-mobile-menu rounded-b-sm overflow-hidden z-10",
          showMobileMenu ? "will-change-height-opacity" : "will-change-auto",
        )}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showMobileMenu ? contentHeight : 0,
          opacity: showMobileMenu ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div ref={contentRef} className="flex flex-col pb-4 px-5">
          {/* ROOT MENU NO LAYERS DOWN */}
          {!isSubMenuActive && showMobileMenu && (
            <>
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <NavbarMobileParentItem
                      key={item.id}
                      text={item.text}
                      onClick={() =>
                        setActiveSubMenu(
                          activeSubMenu === item.id ? null : item.id,
                        )
                      }
                    />
                  );
                }

                return (
                  <NavbarMobileLineItemLink
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    text={item.text}
                  />
                );
              })}
            </>
          )}

          {/* SUBMENU */}
          {isSubMenuActive && (
            <div>
              {navItems
                .find((item) => item.id === activeSubMenu)
                ?.subItems?.map((subItem, index) => (
                  <div
                    key={subItem.id}
                    className={cn("flex flex-col", index > 0 && "mt-6")}
                  >
                    <p
                      className={cn(
                        index === 0 && "pt-2",
                        "text-navbar-light mb-2",
                      )}
                    >
                      {subItem.text}
                    </p>
                    <div className="flex flex-col">
                      {subItem.items.map((item) => (
                        <NavbarMobileLineItemLink
                          key={item.id}
                          href={item.href}
                          onClick={() => setShowMobileMenu(false)}
                          text={item.text}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* OVERLAY */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => {
            setShowMobileMenu(false);
            setActiveSubMenu(null);
          }}
        />
      )}
    </>
  );
}
