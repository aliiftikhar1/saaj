import Link from "next/link";
import { getButtonStyles } from "@/components";
import { routes } from "@/lib/routing/routes";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 gap-8">
      <h2 className="text-2xl font-medium text-neutral-12">
        Your cart is empty
      </h2>
      <p className="text-neutral-10 text-base text-center max-w-md">
        Looks like you haven&apos;t added anything to your cart yet. Start
        shopping to find your perfect items!
      </p>
      <Link href={routes.shop} className={getButtonStyles("dark")}>
        Continue Shopping
      </Link>
    </div>
  );
}
