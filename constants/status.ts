import type { TransactionStatus } from "@/types/transaction";
import type { CustomerStatus } from "@/types/customer";

export const transactionStatusVariant: Record<TransactionStatus, "success" | "warning" | "destructive"> = {
  paid:    "success",
  pending: "warning",
  failed:  "destructive",
};

export const customerStatusVariant: Record<CustomerStatus, "success" | "warning" | "destructive"> = {
  active:  "success",
  trial:   "warning",
  churned: "destructive",
};
