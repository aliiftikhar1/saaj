"use client";

import Link from "next/link";
import { cn } from "@/lib";
import { NavItemSubItemType } from "./types";

type NavbarSubMenuProps = {
  show: boolean;
  subItems: NavItemSubItemType[];
  onClose?: () => void;
};

export function NavbarSubMenu(props: NavbarSubMenuProps) {
  const { show, subItems, onClose } = props;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-neutral-03 p-5 min-w-[280px] transition-all duration-200 ease-out",
        "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.04)]",
        show
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-2 invisible",
      )}
    >
      {/* Decorative top bar */}
      <div className="h-[2px] rounded-full bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c] to-[#c9a84c]/40 mb-4 -mt-1" />

      <div className="flex gap-8">
        {subItems?.map((subItem) => (
          <div key={subItem.id} className="flex flex-col min-w-[140px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#c9a84c] mb-3">
              {subItem.text}
            </p>
            <div className="flex flex-col gap-0.5">
              {subItem.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="text-[13px] tracking-[0.01em] text-neutral-09 hover:text-neutral-12 hover:translate-x-0.5 py-1.5 transition-all duration-150"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
