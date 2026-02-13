export type CustomerStatus = "active" | "trial" | "churned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: string;
  ltv: string;
  status: CustomerStatus;
  joined: string;
}

export interface TopCustomer {
  name: string;
  email: string;
  plan: string;
  mrr: string;
  status: CustomerStatus;
}
