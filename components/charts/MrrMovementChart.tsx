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

interface MrrMovementDataPoint {
  month: string;
  new: number;
  expansion: number;
  contraction: number;
  churned: number;
}

const series = [
  { key: "new",         label: "New",         color: "var(--color-chart-new)"         },
  { key: "expansion",   label: "Expansion",   color: "var(--color-chart-expansion)"   },
  { key: "contraction", label: "Contraction", color: "var(--color-chart-contraction)" },
  { key: "churned",     label: "Churned",     color: "var(--color-chart-churned)"     },
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

const seriesColor: Record<string, string> = Object.fromEntries(
  series.map((s) => [s.key, s.color])
);

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const net = payload.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="rounded border border-border bg-surface px-3 py-2.5 text-xs">
      <p className="mb-2 font-medium text-foreground">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((p) => {
          const color = seriesColor[p.name] ?? p.fill;
          return (
            <div key={p.name} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-sm shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize text-muted">{p.name}</span>
              </div>
              <span style={{ color }}>
                {p.value >= 0 ? "+" : "−"}
                {formatCurrency(Math.abs(p.value))}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
        <span className="text-muted">Net change</span>
        <span
          className={`font-medium ${net >= 0 ? "text-success" : "text-destructive"}`}
        >
          {net >= 0 ? "+" : "−"}
          {formatCurrency(Math.abs(net))}
        </span>
      </div>
    </div>
  );
}

export default function MrrMovementChart({ data }: { data: MrrMovementDataPoint[] }) {
  return (
    <div>
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-sm shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-xs text-muted">{s.label}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          barSize={18}
        >
          <CartesianGrid vertical={false} stroke="var(--color-surface-raised)" />
          <ReferenceLine y={0} stroke="var(--color-border)" strokeWidth={1} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickFormatter={formatCompactCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-surface-raised)" }} />
          <Bar dataKey="new"         stackId="stack" fill="#2dd4bf" name="new"         radius={0} />
          <Bar dataKey="expansion"   stackId="stack" fill="#38bdf8" name="expansion"   radius={0} />
          <Bar dataKey="contraction" stackId="stack" fill="#fb923c" name="contraction" radius={0} />
          <Bar dataKey="churned"     stackId="stack" fill="#f87171" name="churned"     radius={0} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
