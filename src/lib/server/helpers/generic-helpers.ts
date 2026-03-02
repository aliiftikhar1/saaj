import { ServerActionResponse } from "@/types/server";

export async function wrapServerCall<T>(
  fn: () => Promise<T>,
): Promise<ServerActionResponse<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getReadingMinutes(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  return Math.ceil(minutes);
}
