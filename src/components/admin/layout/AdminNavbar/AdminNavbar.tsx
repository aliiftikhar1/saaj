"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { adminRoutes } from "@/lib";
import { AdminNavbarItem } from "./AdminNavbarItem";
import { CloseIcon, MenuBarIcon } from "@/components/icons";
import { adminLogout } from "@/lib/server/actions/admin-auth-actions";
import {
  AdminAlertDialog,
  AdminAlertDialogContent,
  AdminAlertDialogHeader,
  AdminAlertDialogTitle,
  AdminAlertDialogDescription,
  AdminAlertDialogFooter,
  AdminAlertDialogCancel,
  AdminAlertDialogAction,
} from "@/components/admin";

export function AdminNavbar() {
  // === STATE ===
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [isMobileNavigating, startMobileTransition] = useTransition();

  // === HOOKS ===
  const pathName = usePathname();
  const router = useRouter();

  // Derive whether to show loading bar: navigatingTo is set but we haven't arrived yet
  const isNavigating = navigatingTo !== null && navigatingTo !== pathName;

  // === FUNCTIONS ===
  const isActive = (href: string) => pathName === href;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await adminLogout();
  };

  // === NAV ITEMS ===
  const navItems = [
    { href: adminRoutes.home, text: "Home" },
    { href: adminRoutes.products, text: "Products" },
    { href: adminRoutes.categories, text: "Categories" },
    { href: adminRoutes.orders, text: "Orders" },
    { href: adminRoutes.blogs, text: "Blog" },
    { href: adminRoutes.authors, text: "Authors" },
    { href: adminRoutes.collections, text: "Collections" },
    { href: adminRoutes.team, text: "Team" },
    { href: adminRoutes.testimonials, text: "Testimonials" },
    { href: adminRoutes.coupons, text: "Coupons" },
    { href: adminRoutes.siteContent, text: "Content" },
    { href: adminRoutes.admins, text: "Admins" },
    { href: adminRoutes.settings, text: "Settings" },
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full bg-white z-50 h-16 flex items-center px-5 md:px-10 xl:px-12">
        {/* Top loading bar */}
        {(isNavigating || isMobileNavigating) && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-02 overflow-hidden z-[60]">
            <div className="h-full bg-black animate-[loading-bar_1.5s_ease-in-out_infinite] w-1/3" />
          </div>
        )}

        {/* Left Branding */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg md:text-xl text-black">
            Saaj Tradition
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
                onNavigating={(href) => setNavigatingTo(href)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Logout + Mobile Toggle */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className="hidden md:inline-flex cursor-pointer text-sm font-medium text-neutral-10 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer md:hidden p-2 hover:bg-neutral-02 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuBarIcon />}
          </button>
        </div>
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
              onClick={(e) => {
                if (!isActive(item.href)) {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  startMobileTransition(() => {
                    router.push(item.href);
                  });
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className={`px-4 py-3 rounded-lg font-medium text-base transition-all flex items-center gap-2 ${
                isActive(item.href)
                  ? "bg-black text-white"
                  : "text-neutral-11 hover:bg-neutral-02"
              }`}
            >
              {item.text}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowLogoutDialog(true);
            }}
            className="w-full cursor-pointer text-left px-4 py-3 rounded-lg font-medium text-base text-red-600 hover:bg-red-50 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AdminAlertDialog
        open={showLogoutDialog}
        onOpenChange={(open) => !isLoggingOut && setShowLogoutDialog(open)}
      >
        <AdminAlertDialogContent>
          <AdminAlertDialogHeader>
            <AdminAlertDialogTitle>Confirm Logout</AdminAlertDialogTitle>
            <AdminAlertDialogDescription>
              Are you sure you want to log out of the admin panel?
            </AdminAlertDialogDescription>
          </AdminAlertDialogHeader>
          <AdminAlertDialogFooter>
            <AdminAlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AdminAlertDialogCancel>
            <AdminAlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </AdminAlertDialogAction>
          </AdminAlertDialogFooter>
        </AdminAlertDialogContent>
      </AdminAlertDialog>
    </>
  );
}
