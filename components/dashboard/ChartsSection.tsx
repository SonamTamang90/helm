"use client";

import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import { useDateRange } from "@/context/DateRangeContext";
import type { DataPoint } from "@/types/common";

const RevenueChart       = dynamic(() => import("@/components/charts/RevenueChart"),       { ssr: false });
const PlanBreakdownChart = dynamic(() => import("@/components/charts/PlanBreakdownChart"), { ssr: false });

const allData: DataPoint[] = [
  { month: "Jan", mrr: 38000 },
  { month: "Feb", mrr: 40000 },
  { month: "Mar", mrr: 39500 },
  { month: "Apr", mrr: 42000 },
  { month: "May", mrr: 44000 },
  { month: "Jun", mrr: 43500 },
  { month: "Jul", mrr: 45000 },
  { month: "Aug", mrr: 46500 },
  { month: "Sep", mrr: 47000 },
  { month: "Oct", mrr: 46000 },
  { month: "Nov", mrr: 47500 },
  { month: "Dec", mrr: 48200 },
];

const periodSlice = { "3M": 3, "6M": 6, "12M": 12 } as const;

export default function ChartsSection() {
  const { period } = useDateRange();
  const chartData = allData.slice(-periodSlice[period]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <p className="text-sm font-medium text-foreground">Revenue Overview</p>
        <p className="mt-0.5 text-xs text-muted">Monthly recurring revenue — last {period}</p>
        <div className="mt-6">
          <RevenueChart data={chartData} />
        </div>
      </Card>

      <Card>
        <p className="text-sm font-medium text-foreground">Revenue by Plan</p>
        <p className="mt-0.5 text-xs text-muted">Breakdown across active plans</p>
        <div className="mt-6">
          <PlanBreakdownChart />
        </div>
      </Card>
    </div>
  );
}
