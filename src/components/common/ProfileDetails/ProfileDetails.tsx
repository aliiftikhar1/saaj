import { cn } from "@/lib";
import Image from "next/image";

type ProfileDetailsProps = {
  className?: string;
  variant?: "compact" | "regular";
  reviewerImageUrl: string;
  reviewerName: string;
  reviewerTitle: string;
};

export function ProfileDetails(props: ProfileDetailsProps) {
  // === PROPS ===
  const {
    variant = "regular",
    className = "",
    reviewerImageUrl,
    reviewerName,
    reviewerTitle,
  } = props;

  return (
    <div className={`flex items-center gap-x-4 ${className}`}>
      <div
        className={cn(
          "relative",
          variant === "compact" ? "w-10 h-10" : "w-12 h-12",
        )}
      >
        <Image
          quality={60}
          src={reviewerImageUrl}
          alt={reviewerName}
          fill
          sizes="48px"
          className="object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-base">{reviewerName}</p>
        <p className="text-sm text-neutral-10">{reviewerTitle}</p>
      </div>
    </div>
  );
}
