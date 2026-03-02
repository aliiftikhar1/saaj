"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { adminRoutes } from "@/lib";
import { AdminNavbarItem } from "./AdminNavbarItem";
import { CloseIcon, MenuBarIcon } from "@/components/icons";

export function AdminNavbar() {
  // === STATE ===
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // === HOOKS ===
  const pathName = usePathname();

  // === FUNCTIONS ===
  const isActive = (href: string) => pathName === href;

  // === NAV ITEMS ===
  const navItems = [
    { href: adminRoutes.home, text: "Home" },
    { href: adminRoutes.products, text: "Products" },
    { href: adminRoutes.orders, text: "Orders" },
    { href: adminRoutes.blogs, text: "Blog" },
    { href: adminRoutes.authors, text: "Authors" },
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full bg-white z-50 h-16 flex items-center px-5 md:px-10 xl:px-12">
        {/* Left Branding */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg md:text-xl text-black">
            Cartelle
          </span>
          <span className="text-xs md:text-sm font-medium text-neutral-10 px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-neutral-02">
            Admin
          </span>
        </div>

        {/* Center Nav Items - Desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="h-11 flex items-center gap-2 rounded-full border border-neutral-02 bg-white/80 backdrop-blur-md shadow-sm px-1">
            {navItems.map((item) => (
              <AdminNavbarItem
                key={item.href}
                isActive={isActive(item.href)}
                href={item.href}
                text={item.text}
              />
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer md:hidden ml-auto p-2 hover:bg-neutral-02 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuBarIcon />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 w-64 bg-white shadow-lg z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium text-base transition-all ${
                isActive(item.href)
                  ? "bg-black text-white"
                  : "text-neutral-11 hover:bg-neutral-02"
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
