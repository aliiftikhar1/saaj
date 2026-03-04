type PartnerLogosMarqueeProps = {
  isActive: boolean;
  heading: string;
  logos: string[];
};

export function PartnerLogosMarquee({
  isActive,
  heading,
  logos,
}: PartnerLogosMarqueeProps) {
  if (!isActive || logos.length === 0) return null;

  return (
    <div className="overflow-hidden py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200 relative">
      {heading && (
        <p className="text-center text-xs uppercase tracking-[0.4em] mb-8 sm:mb-10 text-neutral-400 px-4">
          {heading}
        </p>
      )}
      {/* Uses same forward-scroll but slower speed for variety */}
      <div className="animate-marquee flex items-center" style={{ animationDuration: "50s" }}>
        {/* Group 1 */}
        <div className="flex items-center shrink-0">
          {logos.map((logo, i) => (
            <span
              key={`l1-${i}`}
              className="text-lg sm:text-2xl md:text-3xl font-black tracking-widest text-neutral-400 whitespace-nowrap mx-10 sm:mx-14 md:mx-16 select-none"
            >
              {logo}
            </span>
          ))}
        </div>
        {/* Group 2 — exact duplicate for seamless loop */}
        <div className="flex items-center shrink-0">
          {logos.map((logo, i) => (
            <span
              key={`l2-${i}`}
              className="text-lg sm:text-2xl md:text-3xl font-black tracking-widest text-neutral-400 whitespace-nowrap mx-10 sm:mx-14 md:mx-16 select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
