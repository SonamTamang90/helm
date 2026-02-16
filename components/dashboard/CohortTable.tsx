interface CohortRow {
  month: string;
  size: number;
  retention: (number | null)[];
}

const cohortData: CohortRow[] = [
  { month: "Jan 2025", size: 124, retention: [100, 88, 82, 76, 72, 69, 65, 63, 61, 60, 58, 57] },
  { month: "Feb 2025", size: 98,  retention: [100, 90, 83, 78, 74, 70, 67, 65, 63, 62, 60, 59] },
  { month: "Mar 2025", size: 143, retention: [100, 87, 81, 75, 71, 68, 64, 62, 60, 59, 57, null] },
  { month: "Apr 2025", size: 167, retention: [100, 91, 85, 79, 75, 72, 68, 66, 64, 63, null, null] },
  { month: "May 2025", size: 189, retention: [100, 89, 84, 78, 74, 71, 67, 65, 64, null, null, null] },
  { month: "Jun 2025", size: 201, retention: [100, 92, 86, 81, 76, 73, 70, 68, null, null, null, null] },
  { month: "Jul 2025", size: 178, retention: [100, 88, 83, 77, 73, 70, 67, null, null, null, null, null] },
  { month: "Aug 2025", size: 215, retention: [100, 91, 85, 80, 76, 73, null, null, null, null, null, null] },
  { month: "Sep 2025", size: 234, retention: [100, 90, 84, 79, 75, null, null, null, null, null, null, null] },
  { month: "Oct 2025", size: 198, retention: [100, 87, 82, 77, null, null, null, null, null, null, null, null] },
  { month: "Nov 2025", size: 223, retention: [100, 89, 84, null, null, null, null, null, null, null, null, null] },
  { month: "Dec 2025", size: 256, retention: [100, 88, null, null, null, null, null, null, null, null, null, null] },
];

const MONTH_COUNT = 12;

function getCellBg(value: number): string {
  const hue = Math.round(value * 1.2);
  return `hsl(${hue} 55% 24%)`;
}

export default function CohortTable() {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-xs font-medium text-muted whitespace-nowrap w-28">
                Cohort
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted whitespace-nowrap w-24">
                Customers
              </th>
              {Array.from({ length: MONTH_COUNT }, (_, i) => (
                <th key={i} className="px-3 py-3 text-center text-xs font-medium text-muted whitespace-nowrap w-16">
                  M{i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row) => (
              <tr
                key={row.month}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-raised/30"
              >
                <td className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-sm font-medium text-foreground whitespace-nowrap">
                  {row.month}
                </td>
                <td className="px-4 py-2.5 text-right text-sm text-muted tabular-nums whitespace-nowrap">
                  {row.size.toLocaleString()}
                </td>
                {Array.from({ length: MONTH_COUNT }, (_, i) => {
                  const value = row.retention[i] ?? null;

                  if (value === null) {
                    return (
                      <td key={i} className="px-3 py-2.5 text-center text-muted text-sm">
                        —
                      </td>
                    );
                  }

                  if (i === 0) {
                    return (
                      <td key={i} className="px-3 py-2.5 text-center">
                        <span className="text-xs font-medium text-muted tabular-nums">100%</span>
                      </td>
                    );
                  }

                  return (
                    <td key={i} className="px-3 py-2.5 text-center">
                      <span
                        className="inline-flex items-center justify-center rounded min-w-11 h-6 px-1.5 text-xs font-medium tabular-nums text-foreground"
                        style={{ backgroundColor: getCellBg(value) }}
                      >
                        {value}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
