import type { Metadata } from "next";

import {
  AnimatedHeadingText,
  AnimateFadeIn,
  BaseSection,
  ContactCard,
  NewsletterCard,
} from "@/components";

import { supportContactInfo } from "@/lib";

export const metadata: Metadata = {
  title: "Location",
};

export default function LocationPage() {
  return (
    <main>
      {/* Map Hero Section */}
      <BaseSection id="location-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text="Our Location"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            Visit us or get in touch — we&apos;d love to hear from you.
          </p>
        </div>

        <AnimateFadeIn className="w-full">
          <div className="w-full aspect-video md:aspect-[21/9] rounded-md overflow-hidden border border-neutral-05">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.937026786847!2d71.26772778768905!3d29.137047797557397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393bcbcd280962ff%3A0xafc8fbbd8278f2d0!2sHotel%20Pearl%20Resort!5e0!3m2!1sen!2s!4v1772528064258!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saaj Tradition Location"
            />
          </div>
        </AnimateFadeIn>
      </BaseSection>

      {/* Contact Section */}
      <BaseSection
        id="contact-section"
        className="py-16 xl:py-20 flex flex-col gap-8"
      >
        <AnimatedHeadingText text="Contact" />
        <div className="flex justify-between flex-col xl:flex-row gap-6 w-full">
          {supportContactInfo.map((contact, index) => (
            <ContactCard className="xl:w-full flex-1" key={index} {...contact} />
          ))}
        </div>
      </BaseSection>

      {/* Newsletter */}
      <div className="relative bg-main-01">
        <BaseSection id="location-newsletter-section" className="py-16 xl:py-20">
          <NewsletterCard />
        </BaseSection>
      </div>
    </main>
  );
}
