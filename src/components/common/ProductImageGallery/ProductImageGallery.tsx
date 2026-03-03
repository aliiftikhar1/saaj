"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const scrollToThumb = useCallback(
    (index: number) => {
      if (!thumbContainerRef.current) return;
      const thumbs = thumbContainerRef.current.children;
      if (thumbs[index]) {
        (thumbs[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
    [],
  );

  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    scrollToThumb(index);
  };

  const handlePrev = () => {
    const next = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(next);
    scrollToThumb(next);
  };

  const handleNext = () => {
    const next = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(next);
    scrollToThumb(next);
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full max-h-[75vh] overflow-hidden rounded-sm bg-neutral-02 group">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
          className="object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-sm cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-sm cursor-pointer"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter (mobile) */}
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 sm:hidden bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
            {activeIndex + 1}/{images.length}
          </span>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          ref={thumbContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden cursor-pointer transition-all duration-200 ${
                index === activeIndex
                  ? "ring-2 ring-black ring-offset-1 opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumb ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
