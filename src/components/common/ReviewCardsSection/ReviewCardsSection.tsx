"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

import { ReviewCard, BaseSection } from "@/components";
import { SCROLL_ANIMATION_IN_VIEW_CONFIG } from "@/lib/animations";

type ReviewCardsSectionProps = {
  reviews: {
    rating: number;
    reviewText: string;
    reviewerName: string;
    reviewerTitle: string;
    reviewerImageUrl: string;
  }[];
};

// TO IMPROVE: Split Server and Client Components better

export function ReviewCardsSection({ reviews }: ReviewCardsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, SCROLL_ANIMATION_IN_VIEW_CONFIG);
  return (
    <div
      className="bg-main-01 overflow-hidden relative max-w-[1750px] mx-auto"
      ref={ref}
    >
      <BaseSection className="py-16 xl:py-20" id="reviews-section">
        <div className="z-10 relative">
          <div className="flex gap-4 animate-scroll-left ">
            {/* First set of reviews */}
            {reviews.map((review, index) => (
              <ReviewCard
                key={`first-${index}`}
                rating={review.rating}
                reviewText={review.reviewText}
                reviewerName={review.reviewerName}
                reviewerTitle={review.reviewerTitle}
                reviewerImageUrl={review.reviewerImageUrl}
                animationTriggered={isInView}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, index) => (
              <ReviewCard
                key={`second-${index}`}
                rating={review.rating}
                reviewText={review.reviewText}
                reviewerName={review.reviewerName}
                reviewerTitle={review.reviewerTitle}
                reviewerImageUrl={review.reviewerImageUrl}
                animationTriggered={isInView}
              />
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-10 md:w-20 z-10 bg-linear-to-r from-main-01 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-10 md:w-20 z-10 bg-linear-to-l from-main-01 to-transparent" />
        </div>
      </BaseSection>
      <div className="bg-main-01 absolute left-0 top-0 bottom-0 w-5 md:w-10 xl:w-12 z-20" />
      <div className="bg-main-01 absolute right-0 top-0 bottom-0 w-5 md:w-10 xl:w-12 z-20" />
    </div>
  );
}
