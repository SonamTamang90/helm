import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Link from "next/link";
import type { TopCustomer, CustomerStatus } from "@/types/customer";

const statusVariant: Record<CustomerStatus, "success" | "warning" | "destructive"> = {
  active:  "success",
  trial:   "warning",
  churned: "destructive",
};

const topCustomers: TopCustomer[] = [
  { name: "Waystar Royco",      email: "logan@waystar.com",     plan: "Enterprise", mrr: "$599", status: "active" },
  { name: "Stark Industries",   email: "tony@stark.com",        plan: "Enterprise", mrr: "$599", status: "active" },
  { name: "Hooli",              email: "gavin@hooli.com",       plan: "Enterprise", mrr: "$599", status: "active" },
  { name: "Buy n Large",        email: "ceo@buynlarge.com",     plan: "Enterprise", mrr: "$599", status: "active" },
  { name: "Acme Corp",          email: "billing@acme.com",      plan: "Pro",        mrr: "$299", status: "active" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

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
              <Badge label={c.status} variant={statusVariant[c.status]} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
