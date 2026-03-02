import { cn } from "@/lib";
import { ReactNode } from "react";

export function convertStringToBlog(
  blogString: string,
  isAdminPreview: boolean = false,
): ReactNode {
  if (!blogString?.trim()) return <></>;

  return blogString.split("\n").map((line, index) => {
    if (line.startsWith("# ")) {
      return (
        <h3
          key={index}
          className={cn(
            isAdminPreview
              ? "text-base font-bold mb-2"
              : "text-xl xl:text-2xl font-medium mb-5",
          )}
        >
          {line.replace("# ", "")}
        </h3>
      );
    } else {
      return (
        <p
          key={index}
          className={cn(
            isAdminPreview
              ? "text-sm mb-4"
              : `text-base ${index === blogString.split("\n").length - 1 ? "mb-0" : "mb-10"}`,
          )}
        >
          {line}
        </p>
      );
    }
  });
}
