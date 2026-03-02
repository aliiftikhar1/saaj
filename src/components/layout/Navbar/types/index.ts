export type NavItemSubItemType = {
  id: string;
  text: string;
  items: {
    id: string;
    text: string;
    href: string;
  }[];
};

export type NavItemType = {
  id: string;
  text: string;
  href: string;
  subItems?: NavItemSubItemType[];
};
