import React from "react";

type AnnouncementMarqueeProps = {
  isActive: boolean;
  bgColor: string;
  textColor: string;
  separatorColor: string;
  texts: string[];
};

export function AnnouncementMarquee({
  isActive,
  bgColor,
  textColor,
  separatorColor,
  texts,
}: AnnouncementMarqueeProps) {
  if (!isActive || texts.length === 0) return null;

  return (
    <div
      className="overflow-hidden py-2.5 relative border-b cursor-default w-full"
      style={{
        backgroundColor: bgColor,
        borderColor: separatorColor,
      }}
    >
      <div className="animate-marquee flex items-center">
        {/* Group 1 */}
        <div className="flex items-center shrink-0">
          {texts.map((text, i) => (
            <React.Fragment key={`g1-${i}`}>
              <span
                className="text-xs sm:text-sm tracking-[0.18em] uppercase whitespace-nowrap mx-5 sm:mx-8 font-medium"
                style={{ color: textColor }}
              >
                {text}
              </span>
              <span
                className="text-xs mx-4 sm:mx-6 select-none"
                style={{ color: separatorColor }}
                aria-hidden
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Group 2 — exact duplicate for seamless loop */}
        <div className="flex items-center shrink-0">
          {texts.map((text, i) => (
            <React.Fragment key={`g2-${i}`}>
              <span
                className="text-xs sm:text-sm tracking-[0.18em] uppercase whitespace-nowrap mx-5 sm:mx-8 font-medium"
                style={{ color: textColor }}
              >
                {text}
              </span>
              <span
                className="text-xs mx-4 sm:mx-6 select-none"
                style={{ color: separatorColor }}
                aria-hidden
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
