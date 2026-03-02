/**
 * Formats a date to "4 Mar, 2025" format
 */

export function formatBlogDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

/*
 * Formats a date to "YYYY-MM-DD" format
 */

export function formatDateToYYYYMMDD(
  date: Date | string | null,
): string | null {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
}

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}
