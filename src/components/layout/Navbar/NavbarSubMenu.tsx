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
        "bg-white/95 backdrop-blur-xl rounded-xl border border-neutral-04/40 p-5 min-w-[280px] transition-all duration-200 ease-out",
        "shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.04)]",
        show
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-1 invisible",
      )}
    >
      <div className="flex gap-8">
        {subItems?.map((subItem) => (
          <div key={subItem.id} className="flex flex-col min-w-[140px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-neutral-08 mb-3">
              {subItem.text}
            </p>
            <div className="flex flex-col gap-0.5">
              {subItem.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="text-[13px] tracking-[-0.01em] text-neutral-10 hover:text-neutral-12 py-1.5 transition-colors duration-150"
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
