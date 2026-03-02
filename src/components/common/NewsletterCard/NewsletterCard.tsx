import Image from "next/image";

import { AnimateFadeIn, Button, Input } from "@/components/ui";

export function NewsletterCard() {
  return (
    <div className="bg-white border rounded-sm p-6 md:p-8 xl:p-10 flex flex-col xl:flex-row gap-10 justify-between">
      <div className="flex flex-col gap-12 xl:gap-0 justify-between xl:justify-around order-2 xl:order-1 xl:w-1/2 xl:py-8">
        <h3 className="text-2xl lg:text-3xl xl:text-4xl">
          Stay Ahead with Exclusive Deals!
        </h3>
        <p className="text-neutral-10 text-base font-medium gap-12 max-w-150">
          {
            "Be the first to know about special offers, new product drops, and insider updates. Join our newsletter and get exclusive perks delivered straight to your inbox!"
          }
        </p>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <Input
            className="flex-1 w-full md:w-auto"
            variant="light"
            id="newsletter"
            type="email"
            placeholder="Enter your email"
          />
          <Button
            className="w-full md:w-auto"
            variant="light"
            text="Sign up to newsletter"
          />
        </div>
      </div>
      <AnimateFadeIn className="relative xl:w-1/2 aspect-5/3 order-1 xl:order-2">
        <Image
          src="/assets/newsletter-image3.jpg"
          alt="Newsletter"
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 1280px) 50vw, 100vw"
        />
      </AnimateFadeIn>
    </div>
  );
}
