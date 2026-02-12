import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

type Status = "paid" | "pending" | "failed";

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: Status;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", customer: "Acme Corp",        email: "billing@acme.com",      plan: "Pro",        amount: "$299", status: "paid",    date: "Feb 12, 2026" },
  { id: "2", customer: "Globex Inc",        email: "finance@globex.com",    plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 11, 2026" },
  { id: "3", customer: "Initech",           email: "accounts@initech.com",  plan: "Enterprise", amount: "$599", status: "pending", date: "Feb 11, 2026" },
  { id: "4", customer: "Umbrella Co",       email: "billing@umbrella.com",  plan: "Pro",        amount: "$299", status: "failed",  date: "Feb 10, 2026" },
  { id: "5", customer: "Stark Industries",  email: "tony@stark.com",        plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 10, 2026" },
];

const statusVariant: Record<Status, "success" | "warning" | "destructive"> = {
  paid:    "success",
  pending: "warning",
  failed:  "destructive",
};

export default function RecentTransactions() {
  return (
    <Card className="p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">Recent Transactions</p>
          <p className="mt-0.5 text-xs text-muted">Latest 5 transactions</p>
        </div>
        <Link
          href="/transactions"
          className="text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted">Plan</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted">Amount</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={tx.id}
                className={`transition-colors hover:bg-surface-raised/40 ${i !== transactions.length - 1 ? "border-b border-border" : ""}`}
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">{tx.customer}</p>
                  <p className="text-xs text-muted">{tx.email}</p>
                </td>
                <td className="px-5 py-3.5 text-muted">{tx.plan}</td>
                <td className="px-5 py-3.5 font-medium text-foreground">{tx.amount}</td>
                <td className="px-5 py-3.5">
                  <Badge label={tx.status} variant={statusVariant[tx.status]} />
                </td>
                <td className="px-5 py-3.5 text-muted">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
