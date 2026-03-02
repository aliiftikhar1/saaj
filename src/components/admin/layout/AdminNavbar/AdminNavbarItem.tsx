import Link from "next/link";

type NavbarItemProps = {
  isActive: boolean;
  href: string;
  text: string;
};

export function AdminNavbarItem({ isActive, href, text }: NavbarItemProps) {
  return (
    <Link
      href={href}
      className={`
        relative px-3 sm:px-4 md:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base
        transition-all duration-200 select-none
        ${
          isActive
            ? "bg-black text-white"
            : "text-neutral-11 hover:bg-neutral-03 hover:text-black"
        }
      `}
    >
      {text}{" "}
    </Link>
  );
}
