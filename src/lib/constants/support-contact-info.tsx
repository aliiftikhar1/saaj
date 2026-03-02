import { EmailIcon, HomeIcon, PhoneIcon } from "@/components";
import { STORE_EMAIL } from "./store-information";

export const supportContactInfo = [
  {
    title: "Visit Us",
    description: "221B Baker Street, London, NW1 6XE, United Kingdom",
    icon: <HomeIcon />,
  },
  {
    title: "Call Us",
    description: "+44 20 7946 0958",
    href: "tel:+442079460958",
    icon: <PhoneIcon />,
  },
  {
    title: "Email Us",
    description: STORE_EMAIL,
    href: `mailto:${STORE_EMAIL}`,
    icon: <EmailIcon />,
  },
];
