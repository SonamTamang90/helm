import type { Metadata } from "next";
import RevenuePageCharts from "@/components/dashboard/RevenuePageCharts";

export const metadata: Metadata = {
  title: "Revenue",
  description: "Revenue trends, MRR growth, ARPU, and plan breakdown.",
};
import StatCard from "@/components/dashboard/StatCard";

const stats = [
  { label: "Total Revenue YTD",       value: "$527,200", change: "+18.3%", trend: "up"      as const },
  { label: "MRR Growth Rate",         value: "+12.5%",   change: "+2.1%",  trend: "up"      as const },
  { label: "Avg Revenue Per User",    value: "$38.87",   change: "+4.6%",  trend: "up"      as const },
  { label: "Net Revenue Retention",   value: "108%",     change: "+3%",    trend: "up"      as const },
];

export default function RevenuePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Revenue</h1>
        <p className="mt-1 text-sm text-muted">Track your revenue performance and growth.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <RevenuePageCharts />
    </div>
  );
}
