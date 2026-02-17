import type { Metadata } from "next";
import TransactionsTable from "@/components/dashboard/TransactionsTable";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Full record of all billing activity.",
};

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Transactions</h1>
        <p className="mt-1 text-sm text-muted">A full record of all billing activity.</p>
      </div>

      <TransactionsTable />
    </div>
  );
}
