import { StarIcon } from "@/components/icons";
import { AnimatedReviewText } from "@/components/ui";
import { ProfileDetails } from "../ProfileDetails";

type ReviewCardProps = {
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerImageUrl: string;
  animationTriggered?: boolean;
};

export function ReviewCard(props: ReviewCardProps) {
  // === PROPS ===
  const {
    rating,
    reviewText,
    reviewerName,
    reviewerTitle,
    reviewerImageUrl,
    animationTriggered = false,
  } = props;

  return (
    <div className="bg-white flex flex-col p-8 w-[280px] h-[420px] md:h-80 md:w-[400px] rounded-sm gap-6">
      <div className="flex gap-x-2">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i}>
            <StarIcon />
          </span>
        ))}
      </div>
      <AnimatedReviewText
        text={reviewText}
        className="text-neutral-10 text-lg xl:text-xl font-normal!"
        wordStaggerDelay={0.1}
        disableIsInView={true}
        animationTriggered={animationTriggered}
      />
      <ProfileDetails
        className="mt-auto"
        reviewerImageUrl={reviewerImageUrl}
        reviewerName={reviewerName}
        reviewerTitle={reviewerTitle}
      />
    </div>
  );
}
