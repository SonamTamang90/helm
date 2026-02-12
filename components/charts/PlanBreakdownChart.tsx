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

const data = [
  { plan: "Basic",      revenue: 12000 },
  { plan: "Pro",        revenue: 24000 },
  { plan: "Enterprise", revenue: 12200 },
];

const barColors: Record<string, string> = {
  Basic:      "#3b82f6",
  Pro:        "#8b5cf6",
  Enterprise: "#06b6d4",
};

function formatYAxis(value: number) {
  return `$${(value / 1000).toFixed(0)}k`;
}

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
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function PlanBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={32}>
        <CartesianGrid vertical={false} stroke="#292524" />
        <XAxis
          dataKey="plan"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#78716c", fontSize: 12 }}
          dy={8}
        />
        <YAxis
          tickFormatter={formatYAxis}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#78716c", fontSize: 12 }}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#292524" }} />
        <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.plan} fill={barColors[entry.plan]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
