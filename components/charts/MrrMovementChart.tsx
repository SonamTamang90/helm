"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";

const data = [
  { month: "Jan", new: 2800, expansion:  700, contraction:  -300, churned:  -800 },
  { month: "Feb", new: 3200, expansion:  600, contraction:  -200, churned: -1600 },
  { month: "Mar", new: 1800, expansion:  500, contraction:  -600, churned: -2200 },
  { month: "Apr", new: 3600, expansion:  900, contraction:  -400, churned: -1600 },
  { month: "May", new: 2800, expansion: 1000, contraction:  -400, churned: -1400 },
  { month: "Jun", new: 2200, expansion:  700, contraction:  -500, churned: -2900 },
  { month: "Jul", new: 2800, expansion:  900, contraction:  -300, churned: -1900 },
  { month: "Aug", new: 2600, expansion:  900, contraction:  -400, churned: -1600 },
  { month: "Sep", new: 2400, expansion:  700, contraction:  -500, churned: -2100 },
  { month: "Oct", new: 1800, expansion:  600, contraction:  -600, churned: -2800 },
  { month: "Nov", new: 3200, expansion:  800, contraction:  -200, churned: -2300 },
  { month: "Dec", new: 2400, expansion:  900, contraction:  -400, churned: -2200 },
];

const series = [
  { key: "new",         label: "New",         color: "#10b981" },
  { key: "expansion",   label: "Expansion",   color: "#3b82f6" },
  { key: "contraction", label: "Contraction", color: "#f59e0b" },
  { key: "churned",     label: "Churned",     color: "#ef4444" },
] as const;

interface TooltipEntry {
  name: string;
  value: number;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const net = payload.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="rounded border border-border bg-surface px-3 py-2.5 text-xs">
      <p className="mb-2 font-medium text-foreground">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: p.fill }} />
              <span className="capitalize text-muted">{p.name}</span>
            </div>
            <span className={p.value >= 0 ? "text-emerald-500" : "text-red-500"}>
              {p.value >= 0 ? "+" : "−"}{formatCurrency(Math.abs(p.value))}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
        <span className="text-muted">Net change</span>
        <span className={`font-medium ${net >= 0 ? "text-emerald-500" : "text-red-500"}`}>
          {net >= 0 ? "+" : "−"}{formatCurrency(Math.abs(net))}
        </span>
      </div>
    </div>
  );
}

export default function MrrMovementChart() {
  return (
    <div>
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={18}>
        <CartesianGrid vertical={false} stroke="#292524" />
        <ReferenceLine y={0} stroke="#57534e" strokeWidth={1} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#78716c", fontSize: 12 }}
          dy={8}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#78716c", fontSize: 12 }}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#292524" }} />
        <Bar dataKey="new"         stackId="stack" fill="#10b981" name="new"         radius={[0, 0, 0, 0]} />
        <Bar dataKey="expansion"   stackId="stack" fill="#3b82f6" name="expansion"   radius={[4, 4, 0, 0]} />
        <Bar dataKey="contraction" stackId="stack" fill="#f59e0b" name="contraction" radius={[0, 0, 0, 0]} />
        <Bar dataKey="churned"     stackId="stack" fill="#ef4444" name="churned"     radius={[0, 0, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

