import { EmailIcon, HomeIcon, PhoneIcon } from "@/components";
import { STORE_EMAIL } from "./store-information";

export const supportContactInfo = [
  {
    title: "Visit Us",
    description: "47PF+R29, Ahmedpur East, Pakistan",
    icon: <HomeIcon />,
  },
  {
    title: "Call Us",
    description: "+923106040861",
    href: "tel:+923106040861",
    icon: <PhoneIcon />,
  },
  { 
    title: "Email Us",
    description: STORE_EMAIL,
    href: `mailto:${STORE_EMAIL}`,
    icon: <EmailIcon />,
  },
];
