import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { allCustomers } from "@/constants/customers";
import { allTransactions } from "@/constants/transactions";
import { customerStatusVariant, transactionStatusVariant } from "@/constants/status";
import { getInitials } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const customer = allCustomers.find((c) => c.id === id);
  return {
    title: customer ? `${customer.name} | Helm` : "Customer | Helm",
    description: customer ? `Account details and transaction history for ${customer.name}.` : undefined,
  };
}

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = allCustomers.find((c) => c.id === id);
  if (!customer) notFound();

  const transactions = allTransactions
    .filter((tx) => tx.customer === customer.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const metrics = [
    { label: "Monthly Revenue", value: customer.mrr },
    { label: "Lifetime Value",  value: customer.ltv },
    { label: "Current Plan",    value: customer.plan },
    { label: "Member Since",    value: customer.joined },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/customers"
        className="flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Customers
      </Link>

      {/* Customer header */}
      <Card>
        <div className="flex items-center gap-4">
          <Avatar initials={getInitials(customer.name)} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">{customer.name}</h1>
              <Badge label={customer.status} variant={customerStatusVariant[customer.status]} />
            </div>
            <p className="mt-0.5 text-sm text-muted">{customer.email}</p>
          </div>
        </div>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <p className="text-xs text-muted">{m.label}</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{m.value}</p>
          </Card>
        ))}
      </div>

      {/* Transaction history */}
      <Card className="p-0">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-medium text-foreground">Transaction History</h2>
          <p className="mt-0.5 text-xs text-muted">
            {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
          </p>
        </div>

        {transactions.length === 0 ? (
          <EmptyState
            title="No transactions"
            description="This customer has no recorded transactions."
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-medium text-muted">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted">Plan</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={tx.id}
                  className={`transition-colors hover:bg-surface-raised/40 ${
                    i !== transactions.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 text-muted">{tx.date}</td>
                  <td className="px-5 py-3.5 text-muted">{tx.plan}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{tx.amount}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={tx.status} variant={transactionStatusVariant[tx.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
