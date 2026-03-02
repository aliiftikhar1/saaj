import Image from "next/image";
import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AnimatedHeadingText,
  AnimateFadeIn,
  AnimateStagger,
  BaseSection,
  ContactCard,
  NewsletterCard,
} from "@/components";

import { supportFaqQuestions, supportContactInfo } from "@/lib";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <main>
      <BaseSection id="support-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text="We're Here to Help"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            {
              "Questions? Concerns? Let’s make your shopping experience seamless and enjoyable."
            }
          </p>
        </div>
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between pt-12 items-center">
          <AnimateFadeIn className="relative w-full md:w-1/3 min-h-100 max-h-125 h-full">
            <Image
              priority
              className="object-cover rounded-sm"
              src="/assets/support-hero.webp"
              alt="Support Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={60}
              fill
            />
          </AnimateFadeIn>
          <AnimateFadeIn className="w-full md:w-[57%]">
            <Accordion collapsible type="single">
              {supportFaqQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateFadeIn>
        </div>
      </BaseSection>

      <BaseSection
        id="contact-section"
        className="py-16 xl:py-20 flex flex-col gap-8"
      >
        <AnimatedHeadingText text="Contact" />
        <AnimateStagger
          className="flex justify-between flex-col xl:flex-row gap-6 w-full"
          childClassName="flex-1"
        >
          {supportContactInfo.map((contact, index) => (
            <ContactCard className="xl:w-full" key={index} {...contact} />
          ))}
        </AnimateStagger>
      </BaseSection>

      <div className="relative bg-main-01">
        <BaseSection id="support-newsletter-section" className="py-16 xl:py-20">
          <NewsletterCard />
        </BaseSection>
      </div>
    </main>
  );
}
