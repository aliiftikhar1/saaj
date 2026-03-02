import { cn } from "@/lib";

export function FooterGradientBrandName() {
  return (
    <span
      className={cn(
        "text-center",
        "lg:text-start",
        "leading-none!",
        "block w-full text-transparent footer-text-gradient",
        "text-[clamp(1.5rem,24vw,26rem)]",
        "sm:text-[clamp(1.5rem,24vw,20rem)]",
        "md:text-[clamp(1.5rem,25vw,20rem)]",
        "xl:text-[clamp(1.5rem,14vw,15rem)]",
      )}
    >
      Cartelle
    </span>
  );
}
