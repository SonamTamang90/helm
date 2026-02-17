import type { Metadata } from "next";
import StatCard from "@/components/dashboard/StatCard";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Cohort retention analysis across all signup months.",
};
import CohortTable from "@/components/dashboard/CohortTable";

const stats = [
  {
    label: "Avg Month 1 Retention",
    value: "89%",
    change: "+2.1%",
    trend: "up" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
  {
    label: "Avg Month 3 Retention",
    value: "78%",
    change: "+1.4%",
    trend: "up" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Avg Month 6 Retention",
    value: "67%",
    change: "+0.8%",
    trend: "up" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "12-Month Retention",
    value: "58%",
    change: "+3.2%",
    trend: "up" as const,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted">Cohort retention analysis across all signup months.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">Cohort Retention</h2>
            <p className="mt-0.5 text-xs text-muted">
              % of customers from each cohort still active by month. Color intensity reflects retention rate. — indicates data not yet available.
            </p>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="text-xs text-muted">Low</span>
            <div className="flex gap-0.5">
              {[30, 45, 60, 75, 90].map((v) => (
                <span
                  key={v}
                  className="inline-block h-3.5 w-5 rounded-sm"
                  style={{ backgroundColor: `hsl(${Math.round(v * 1.2)} 55% 24%)` }}
                />
              ))}
            </div>
            <span className="text-xs text-muted">High</span>
          </div>
        </div>

        <CohortTable />
      </div>
    </div>
  );
}
