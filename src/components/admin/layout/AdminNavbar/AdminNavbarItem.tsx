"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NavbarItemProps = {
  isActive: boolean;
  href: string;
  text: string;
  onNavigating?: (href: string) => void;
};

export function AdminNavbarItem({
  isActive,
  href,
  text,
  onNavigating,
}: NavbarItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) return;
    e.preventDefault();
    onNavigating?.(href);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`
        relative px-3 sm:px-4 md:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base
        transition-all duration-200 select-none
        ${
          isActive
            ? "bg-black text-white"
            : isPending
              ? "bg-neutral-03 text-neutral-07"
              : "text-neutral-11 hover:bg-neutral-03 hover:text-black"
        }
      `}
    >
      {isPending ? (
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {text}
        </span>
      ) : (
        text
      )}
    </Link>
  );
}
