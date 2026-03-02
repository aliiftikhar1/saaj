import { cn } from "@/lib/utils/cn";
import { HiCheckCircle } from "react-icons/hi2";

type CircleCheckIconProps = {
  size?: "L" | "M";
};

export function CircleCheckIcon(props: CircleCheckIconProps) {
  const { size = "M" } = props;

  return (
    <HiCheckCircle
      className={cn("text-green-700", size === "L" ? "h-16 w-16" : "h-5 w-5")}
    />
  );
}
