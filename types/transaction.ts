export type TransactionStatus = "paid" | "pending" | "failed";

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: TransactionStatus;
  date: string;
}
