import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { customerStatusVariant } from "@/constants/status";
import { allCustomers } from "@/constants/customers";
import { getInitials, parseCurrency } from "@/lib/utils";

const topCustomers = [...allCustomers]
  .sort((a, b) => parseCurrency(b.mrr) - parseCurrency(a.mrr))
  .slice(0, 5);

export default function TopCustomers() {
  return (
    <Card className="p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">Top Customers</p>
          <p className="mt-0.5 text-xs text-muted">By monthly recurring revenue</p>
        </div>
        <Link
          href="/customers"
          className="text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {topCustomers.map((c, i) => (
          <div
            key={c.email}
            className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-surface-raised/40 ${
              i !== topCustomers.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <Avatar initials={getInitials(c.name)} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
              <p className="truncate text-xs text-muted">{c.plan}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-sm font-medium text-foreground">{c.mrr}</p>
              <Badge label={c.status} variant={customerStatusVariant[c.status]} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
