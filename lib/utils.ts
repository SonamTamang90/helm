/**
 * Formats a number as a compact dollar amount for chart Y axes.
 * Example: 48200 → "$48k"
 */
export function formatCompactCurrency(value: number): string {
  return `$${(value / 1000).toFixed(0)}k`;
}

/**
 * Formats a number as a full dollar amount with locale separators.
 * Example: 48200 → "$48,200"
 */
export function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

/**
 * Strips currency symbols and commas and returns a float for sorting.
 * Example: "$3,588" → 3588
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[$,]/g, ""));
}

/**
 * Parses a date string into a Unix timestamp for sorting.
 * Example: "Feb 12, 2026" → 1739318400000
 */
export function parseDate(value: string): number {
  return new Date(value).getTime();
}

/**
 * Returns up to 2 uppercase initials from a display name.
 * Example: "Acme Corp" → "AC"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
