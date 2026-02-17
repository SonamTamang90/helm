"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";

interface MonthData {
  month: string;
  startMrr: number;
  new: number;
  expansion: number;
  contraction: number;
  churned: number;
}

const monthlyData: MonthData[] = [
  { month: "Jan", startMrr: 35600, new: 2800, expansion:  700, contraction:  -300, churned:  -800 },
  { month: "Feb", startMrr: 38000, new: 3200, expansion:  600, contraction:  -200, churned: -1600 },
  { month: "Mar", startMrr: 40000, new: 1800, expansion:  500, contraction:  -600, churned: -2200 },
  { month: "Apr", startMrr: 39500, new: 3600, expansion:  900, contraction:  -400, churned: -1600 },
  { month: "May", startMrr: 42000, new: 2800, expansion: 1000, contraction:  -400, churned: -1400 },
  { month: "Jun", startMrr: 44000, new: 2200, expansion:  700, contraction:  -500, churned: -2900 },
  { month: "Jul", startMrr: 43500, new: 2800, expansion:  900, contraction:  -300, churned: -1900 },
  { month: "Aug", startMrr: 45000, new: 2600, expansion:  900, contraction:  -400, churned: -1600 },
  { month: "Sep", startMrr: 46500, new: 2400, expansion:  700, contraction:  -500, churned: -2100 },
  { month: "Oct", startMrr: 47000, new: 1800, expansion:  600, contraction:  -600, churned: -2800 },
  { month: "Nov", startMrr: 46000, new: 3200, expansion:  800, contraction:  -200, churned: -2300 },
  { month: "Dec", startMrr: 47500, new: 2400, expansion:  900, contraction:  -400, churned: -2200 },
];

interface WaterfallEntry {
  name: string;
  offset: number;
  value: number;
  type: "total" | "positive" | "negative";
}

const segmentColors: Record<string, string> = {
  "Start MRR":   "var(--color-chart-neutral)",
  "New":         "var(--color-chart-new)",
  "Expansion":   "var(--color-chart-expansion)",
  "Contraction": "var(--color-chart-contraction)",
  "Churned":     "var(--color-chart-churned)",
  "End MRR":     "var(--color-primary)",
};

function buildWaterfallData(m: MonthData): WaterfallEntry[] {
  const afterNew        = m.startMrr + m.new;
  const afterExpansion  = afterNew + m.expansion;
  const afterContraction = afterExpansion + m.contraction;
  const endMrr          = afterContraction + m.churned;

  return [
    { name: "Start MRR",   offset: 0,               value: m.startMrr,           type: "total"    },
    { name: "New",         offset: m.startMrr,       value: m.new,                type: "positive" },
    { name: "Expansion",   offset: afterNew,          value: m.expansion,          type: "positive" },
    { name: "Contraction", offset: afterContraction,  value: Math.abs(m.contraction), type: "negative" },
    { name: "Churned",     offset: endMrr,            value: Math.abs(m.churned),  type: "negative" },
    { name: "End MRR",     offset: 0,                 value: endMrr,               type: "total"    },
  ];
}

interface TooltipEntry {
  name: string;
  value: number;
  payload: WaterfallEntry;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[1]?.payload ?? payload[0]?.payload;
  if (!entry) return null;

  const sign =
    entry.type === "positive" ? "+" :
    entry.type === "negative" ? "−" : "";

  return (
    <div className="rounded border border-border bg-surface px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-foreground">{entry.name}</p>
      <span style={{ color: segmentColors[entry.name] }}>
        {sign}{formatCurrency(entry.value)}
      </span>
    </div>
  );
}

export default function MrrWaterfallChart() {
  const [selectedMonth, setSelectedMonth] = useState("Dec");

  const month = monthlyData.find((m) => m.month === selectedMonth) ?? monthlyData[11];
  const data = buildWaterfallData(month);
  const net = month.new + month.expansion + month.contraction + month.churned;

  // Zoom the Y-axis so movement bars are clearly visible instead of thin slivers
  const allPoints = data.flatMap((d) => [d.offset, d.offset + d.value]).filter((v) => v > 0);
  const domainMin = Math.floor((Math.min(...allPoints) * 0.97) / 1000) * 1000;
  const domainMax = Math.ceil((Math.max(...allPoints) * 1.02) / 1000) * 1000;

  return (
    <div>
      {/* Month picker */}
      <div className="mb-5 flex flex-wrap items-center gap-1">
        {monthlyData.map((m) => (
          <button
            key={m.month}
            onClick={() => setSelectedMonth(m.month)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedMonth === m.month
                ? "bg-surface-raised text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {m.month}
          </button>
        ))}
        <span
          className={`ml-auto text-xs font-medium ${
            net >= 0 ? "text-success" : "text-destructive"
          }`}
        >
          Net {net >= 0 ? "+" : "−"}{formatCurrency(Math.abs(net))}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={40}>
          <CartesianGrid vertical={false} stroke="var(--color-surface-raised)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            dy={8}
          />
          <YAxis
            domain={[domainMin, domainMax]}
            tickFormatter={formatCompactCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-surface-raised)" }} />

          {/* Invisible spacer — lifts the visible bar to the correct position */}
          <Bar dataKey="offset" stackId="wf" fill="transparent" legendType="none" />

          {/* Visible segment */}
          <Bar dataKey="value" stackId="wf" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={segmentColors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {Object.entries(segmentColors).map(([name, color]) => (
          <div key={name} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
