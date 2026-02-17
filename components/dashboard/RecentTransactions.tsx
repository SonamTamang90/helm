import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { transactionStatusVariant } from "@/constants/status";
import { allTransactions } from "@/constants/transactions";
import { parseDate } from "@/lib/utils";

const transactions = [...allTransactions]
  .sort((a, b) => parseDate(b.date) - parseDate(a.date))
  .slice(0, 5);


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
                  <Badge label={tx.status} variant={transactionStatusVariant[tx.status]} />
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
