"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DataPoint } from "@/types/common";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs">
      <p className="text-muted">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="var(--color-primary)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-surface-raised)" />
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
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-surface-raised)", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="mrr"
          stroke="var(--color-primary)"
          strokeWidth={1.5}
          fill="url(#revenueGradient)"
          dot={false}
          activeDot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
