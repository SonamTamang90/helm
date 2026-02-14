"use client";

import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import { useDateRange } from "@/context/DateRangeContext";
import { formatCurrency } from "@/lib/utils";

const RevenueDetailChart = dynamic(() => import("@/components/charts/RevenueDetailChart"), { ssr: false });
const PlanBreakdownChart  = dynamic(() => import("@/components/charts/PlanBreakdownChart"),  { ssr: false });
const MrrMovementChart    = dynamic(() => import("@/components/charts/MrrMovementChart"),    { ssr: false });

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

const allMovement = [
  { month: "Jan", new: 2800, expansion: 700,  contraction: -300, churned: -800  },
  { month: "Feb", new: 3200, expansion: 600,  contraction: -200, churned: -1600 },
  { month: "Mar", new: 1800, expansion: 500,  contraction: -600, churned: -2200 },
  { month: "Apr", new: 3600, expansion: 900,  contraction: -400, churned: -1600 },
  { month: "May", new: 2800, expansion: 1000, contraction: -400, churned: -1400 },
  { month: "Jun", new: 2200, expansion: 700,  contraction: -500, churned: -2900 },
  { month: "Jul", new: 2800, expansion: 900,  contraction: -300, churned: -1900 },
  { month: "Aug", new: 2600, expansion: 900,  contraction: -400, churned: -1600 },
  { month: "Sep", new: 2400, expansion: 700,  contraction: -500, churned: -2100 },
  { month: "Oct", new: 1800, expansion: 600,  contraction: -600, churned: -2800 },
  { month: "Nov", new: 3200, expansion: 800,  contraction: -200, churned: -2300 },
  { month: "Dec", new: 2400, expansion: 900,  contraction: -400, churned: -2200 },
];

const periodSlice = { "3M": 3, "6M": 6, "12M": 12 } as const;

const monthlyBreakdown = allMonths.map((m, i, arr) => {
  const prev = arr[i - 1];
  const growth = prev ? (((m.mrr - prev.mrr) / prev.mrr) * 100).toFixed(1) : null;
  return { ...m, growth };
});

export default function RevenuePageCharts() {
  const { period } = useDateRange();
  const sliceCount = periodSlice[period];
  const chartData    = allMonths.slice(-sliceCount);
  const movementData = allMovement.slice(-sliceCount);
  const breakdownData = monthlyBreakdown.slice(-sliceCount);

  return (
    <div className="flex flex-col gap-4">
      {/* Revenue trend */}
      <Card>
        <div>
          <p className="text-sm font-medium text-foreground">Revenue Trend</p>
          <p className="mt-0.5 text-xs text-muted">Monthly recurring revenue — last {period}</p>
        </div>
        <div className="mt-6">
          <RevenueDetailChart data={chartData} />
        </div>
      </Card>

      {/* MRR movement */}
      <Card>
        <p className="text-sm font-medium text-foreground">MRR Movement</p>
        <p className="mt-0.5 text-xs text-muted">New, expansion, contraction, and churned MRR per month</p>
        <div className="mt-6">
          <MrrMovementChart data={movementData} />
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
                {[...breakdownData].reverse().map((row, i) => (
                  <tr
                    key={row.month}
                    className={`transition-colors hover:bg-surface-raised/40 ${i !== breakdownData.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">{row.month}</td>
                    <td className="px-5 py-3 text-foreground">{formatCurrency(row.mrr)}</td>
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
