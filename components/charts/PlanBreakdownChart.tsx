"use client";

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

const data = [
  { plan: "Basic", revenue: 12000 },
  { plan: "Pro", revenue: 24000 },
  { plan: "Enterprise", revenue: 12200 },
];

const barGradients: Record<string, string> = {
  Basic:      "url(#gradientBasic)",
  Pro:        "url(#gradientPro)",
  Enterprise: "url(#gradientEnterprise)",
};

interface TooltipPayload {
  value: number;
  payload: { plan: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { plan } = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs">
      <p className="text-muted">{plan}</p>
      <p className="mt-0.5 font-medium text-foreground">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function PlanBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
        barSize={32}
      >
        <defs>
          <linearGradient id="gradientBasic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity={1} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="gradientPro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#625ffa" stopOpacity={1} />
            <stop offset="100%" stopColor="#625ffa" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="gradientEnterprise" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ff6900" stopOpacity={1} />
            <stop offset="100%" stopColor="#ff6900" stopOpacity={0.35} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#292524" />
        <XAxis
          dataKey="plan"
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
        <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.plan} fill={barGradients[entry.plan]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
