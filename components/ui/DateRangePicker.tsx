"use client";

import type { Period } from "@/types/common";
import { useDateRange } from "@/context/DateRangeContext";

const periods: Period[] = ["3M", "6M", "12M"];

export default function DateRangePicker() {
  const { period, setPeriod } = useDateRange();

  return (
    <div className="flex items-center gap-0.5 rounded border border-border bg-background p-0.5">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => setPeriod(p)}
          className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
            period === p
              ? "bg-surface-raised text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
