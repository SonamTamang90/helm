"use client";

import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";

const RevenueChart       = dynamic(() => import("@/components/charts/RevenueChart"),       { ssr: false });
const PlanBreakdownChart = dynamic(() => import("@/components/charts/PlanBreakdownChart"), { ssr: false });

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <p className="text-sm font-medium text-foreground">Revenue Overview</p>
        <p className="mt-0.5 text-xs text-muted">Monthly recurring revenue — last 12 months</p>
        <div className="mt-6">
          <RevenueChart />
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
