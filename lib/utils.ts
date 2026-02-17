/**
 * Formats a number as a compact dollar amount for chart Y axes.
 * Examples: 48200 → "$48k" · 1200000 → "$1.2M" · 2500000000 → "$2.5B"
 */
export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (value >= 1_000_000)     return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000)         return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

/**
 * Formats a number as a full dollar amount with locale separators.
 * Example: 48200 → "$48,200"
 */
export function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
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

/**
 * Returns a cutoff Date for the given Period, relative to today.
 * Example: "3M" → Date 3 months ago
 */
export function getPeriodCutoff(period: "3M" | "6M" | "12M"): Date {
  const months = { "3M": 3, "6M": 6, "12M": 12 };
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months[period]);
  return cutoff;
}

/**
 * Returns the page numbers to render for a pagination control.
 * Inserts null as an ellipsis marker when pages are skipped.
 * Example: 1 … 4 5 6 … 12
 */
export function getPaginationRange(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const range: (number | null)[] = [1];

  if (current > 3)  range.push(null);

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) range.push(i);

  if (current < total - 2) range.push(null);
  range.push(total);

  return range;
}

/**
 * Triggers a CSV file download in the browser.
 * Exports all rows — use the filtered/sorted dataset, not paginated.
 */
export function exportToCsv(filename: string, headers: string[], rows: string[][]): void {
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
