import Card from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  /** Which direction is considered positive for this metric. Defaults to "up". */
  goodDirection?: "up" | "down";
  icon?: React.ReactNode;
}

export default function StatCard({
  label,
  value,
  change,
  trend,
  goodDirection = "up",
  icon,
}: StatCardProps) {
  const isPositive = trend !== "neutral" && trend === goodDirection;
  const isNegative = trend !== "neutral" && trend !== goodDirection;

  const trendColor = isPositive
    ? "text-emerald-500"
    : isNegative
      ? "text-red-500"
      : "text-muted";

  const trendIcon =
    trend === "up" ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    ) : trend === "down" ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ) : null;

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted leading-snug">{label}</p>
        {icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-raised text-muted">
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendColor}`}>
        {trendIcon}
        <span>{change} vs last month</span>
      </div>
    </Card>
  );
}
