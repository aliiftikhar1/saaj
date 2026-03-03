"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type NavbarItemProps = {
  isActive: boolean;
  href: string;
  text: string;
  icon: LucideIcon;
  collapsed?: boolean;
  onNavigating?: (href: string) => void;
};

export function AdminNavbarItem({
  isActive,
  href,
  text,
  icon: Icon,
  collapsed = false,
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
      title={collapsed ? text : undefined}
      className={`
        flex items-center rounded-xl text-sm font-medium transition-all select-none
        ${ collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5" }
        ${
          isActive
            ? "bg-gray-900 text-white shadow-sm"
            : isPending
              ? "bg-gray-100 text-gray-400"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
        }
      `}
    >
      {isPending ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0" />
      ) : (
        <Icon size={16} className="shrink-0" />
      )}
      {!collapsed && <span className="flex-1 truncate">{text}</span>}
      {!collapsed && isActive && (
        <span className="h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
      )}
    </Link>
  );
}
