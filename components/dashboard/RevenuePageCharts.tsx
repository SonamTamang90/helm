"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Card from "@/components/ui/Card";

const RevenueDetailChart = dynamic(() => import("@/components/charts/RevenueDetailChart"), { ssr: false });
const PlanBreakdownChart  = dynamic(() => import("@/components/charts/PlanBreakdownChart"),  { ssr: false });

const allMonths = [
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

type Period = "3M" | "6M" | "12M";
const periodSlice: Record<Period, number> = { "3M": 3, "6M": 6, "12M": 12 };

const monthlyBreakdown = allMonths.map((m, i, arr) => {
  const prev = arr[i - 1];
  const growth = prev ? (((m.mrr - prev.mrr) / prev.mrr) * 100).toFixed(1) : null;
  return { ...m, growth };
});

export default function RevenuePageCharts() {
  const [period, setPeriod] = useState<Period>("12M");
  const chartData = allMonths.slice(-periodSlice[period]);

  return (
    <div className="flex flex-col gap-4">
      {/* Revenue trend */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Revenue Trend</p>
            <p className="mt-0.5 text-xs text-muted">Monthly recurring revenue</p>
          </div>
          <div className="flex items-center gap-1">
            {(["3M", "6M", "12M"] as Period[]).map((p) => (
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
        </div>
        <div className="mt-6">
          <RevenueDetailChart data={chartData} />
        </div>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Plan breakdown chart */}
        <Card>
          <p className="text-sm font-medium text-foreground">Revenue by Plan</p>
          <p className="mt-0.5 text-xs text-muted">Breakdown across active plans</p>
          <div className="mt-6">
            <PlanBreakdownChart />
          </div>
        </Card>

        {/* Monthly breakdown table */}
        <Card className="p-0 lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-medium text-foreground">Monthly Breakdown</p>
            <p className="mt-0.5 text-xs text-muted">MRR and growth per month</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted">Month</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted">MRR</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted">Growth</th>
                </tr>
              </thead>
              <tbody>
                {[...monthlyBreakdown].reverse().map((row, i) => (
                  <tr
                    key={row.month}
                    className={`transition-colors hover:bg-surface-raised/40 ${i !== monthlyBreakdown.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">{row.month}</td>
                    <td className="px-5 py-3 text-foreground">${row.mrr.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      {row.growth === null ? (
                        <span className="text-muted">—</span>
                      ) : (
                        <span className={parseFloat(row.growth) >= 0 ? "text-emerald-500" : "text-red-500"}>
                          {parseFloat(row.growth) >= 0 ? "+" : ""}{row.growth}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
