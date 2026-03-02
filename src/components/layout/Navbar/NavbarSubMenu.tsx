"use client";

import Image from "next/image";

import { CustomLink } from "@/components";
import { cn } from "@/lib";
import { NavItemSubItemType } from "./types";

type NavbarSubMenuProps = {
  show: boolean;
  subItems: NavItemSubItemType[];
  onClose?: () => void;
};

export function NavbarSubMenu(props: NavbarSubMenuProps) {
  const { show, subItems, onClose } = props;

  const containerClass = cn(
    "bg-white rounded-sm shadow-custom p-6 w-fit transition-all duration-300 ease-in-out",
    show
      ? "opacity-100 translate-y-0 visible will-change-opacity-transform"
      : "opacity-0 -translate-y-4 invisible will-change-auto",
  );

  return (
    <div className={containerClass}>
      <div className="flex gap-6">
        <div className="w-[150px] h-auto self-stretch relative">
          <Image
            className="rounded-sm object-cover"
            src={"/assets/store-submenu-clothes.jpg"}
            alt="Store submenu image"
            fill
            sizes="150px"
          />
        </div>
        {subItems?.map((subItem) => (
          <div key={subItem.id} className="flex flex-col pb-0 w-[150px]">
            <p className="text-body-medium text-light pb-6">{subItem.text}</p>
            <div className="flex flex-col gap-4">
              {subItem.items.map((item) => (
                <div key={item.id} onClick={onClose}>
                  <CustomLink text={item.text} href={item.href} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
