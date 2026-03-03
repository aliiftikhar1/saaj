import { AnimateFadeIn, CustomLink } from "@/components";
import { routes, STORE_EMAIL, STORE_PHONE } from "@/lib";

import { FooterGradientBrandName } from "./FooterGradientBrandName";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <div className="bg-black">
      <footer className="bg-black mx-auto py-10 px-5 md:px-10 xl:px-11 flex flex-col">
        <AnimateFadeIn className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-col pb-10 md:pb-0">
            <h3 className="mb-6 text-white">Saaj Tradition</h3>
            <div className="flex flex-col gap-2">
              <CustomLink
                variant="on-dark-secondary"
                href={`mailto:${STORE_EMAIL}`}
                text={STORE_EMAIL}
              />
              <CustomLink
                variant="on-dark-secondary"
                href={`tel:${STORE_PHONE}`}
                text={STORE_PHONE}
              />
            </div>
          </div>

          <div className="flex">
            <div className="flex flex-col gap-1 w-[150px]">
              <CustomLink variant="on-dark" href={routes.home} text="Home" />
              <CustomLink variant="on-dark" href={routes.about} text="About" />
              <CustomLink
                variant="on-dark"
                href={routes.location}
                text="Location"
              />
              <CustomLink variant="on-dark" href={routes.blog} text="Blog" />
            </div>
            <div className="flex flex-col gap-1 w-[150px]">
              <CustomLink variant="on-dark" href={routes.shop} text="Shop" />
              <CustomLink
                variant="on-dark"
                href={routes.shopNewArrivals}
                text="New Arrivals"
              />
              <CustomLink
                variant="on-dark"
                href={routes.shopCollections}
                text="Collections"
              />
            </div>
          </div>
        </AnimateFadeIn>
        <AnimateFadeIn className="flex flex-col mt-10 gap-10 xl:gap-0 xl:flex-row items-center">
          <div className="w-full xl:w-7/12 order-2 xl:order-1">
            <FooterGradientBrandName />
          </div>
          <div className="w-full xl:w-5/12 flex flex-col gap-2 order-1 xl:order-2">
            <NewsletterForm />
          </div>
        </AnimateFadeIn>
      </footer>
    </div>
  );
}
