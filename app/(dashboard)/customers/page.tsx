import type { Metadata } from "next";
import CustomersTable from "@/components/dashboard/CustomersTable";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage and monitor your customer base.",
};

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Customers</h1>
        <p className="mt-1 text-sm text-muted">Manage and monitor your customer base.</p>
      </div>

      <CustomersTable />
    </div>
  );
}
