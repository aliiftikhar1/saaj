import Link from "next/link";

import { linkClasses } from "./ShopSidebar";

type ShopSidebarCollectionItemProps = {
  href: string;
  label: string;
};

export function ShopSidebarCollectionItem(
  props: ShopSidebarCollectionItemProps,
) {
  // === PROPS ===
  const { href, label } = props;

  return (
    <Link href={href} className={linkClasses}>
      <span className="text-neutral-04 pr-2">•</span>
      <span>{label}</span>
    </Link>
  );
}
