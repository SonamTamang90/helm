import type { Transaction } from "@/types/transaction";

export const allTransactions: Transaction[] = [
  // Feb 2026 — within all periods
  { id: "1",  customer: "Acme Corp",          email: "billing@acme.com",      plan: "Pro",        amount: "$299", status: "paid",    date: "Feb 12, 2026" },
  { id: "2",  customer: "Globex Inc",          email: "finance@globex.com",    plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 11, 2026" },
  { id: "3",  customer: "Initech",             email: "accounts@initech.com",  plan: "Enterprise", amount: "$599", status: "pending", date: "Feb 11, 2026" },
  { id: "4",  customer: "Umbrella Co",         email: "billing@umbrella.com",  plan: "Pro",        amount: "$299", status: "failed",  date: "Feb 10, 2026" },
  { id: "5",  customer: "Stark Industries",    email: "tony@stark.com",        plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 10, 2026" },
  { id: "6",  customer: "Bluth Company",       email: "gob@bluth.com",         plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 09, 2026" },
  { id: "7",  customer: "Pied Piper",          email: "richard@piedpiper.com", plan: "Pro",        amount: "$299", status: "pending", date: "Feb 09, 2026" },
  { id: "8",  customer: "Hooli",               email: "gavin@hooli.com",       plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 08, 2026" },
  { id: "9",  customer: "Dunder Mifflin",      email: "michael@dm.com",        plan: "Basic",      amount: "$99",  status: "failed",  date: "Feb 08, 2026" },
  { id: "10", customer: "Vandelay Industries", email: "art@vandelay.com",      plan: "Pro",        amount: "$299", status: "paid",    date: "Feb 07, 2026" },
  { id: "11", customer: "Prestige Worldwide",  email: "boats@prestige.com",    plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 07, 2026" },
  { id: "12", customer: "Waystar Royco",       email: "logan@waystar.com",     plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 06, 2026" },
  { id: "13", customer: "Cyberdyne Systems",   email: "miles@cyberdyne.com",   plan: "Pro",        amount: "$299", status: "pending", date: "Feb 06, 2026" },
  { id: "14", customer: "Soylent Corp",        email: "nate@soylent.com",      plan: "Basic",      amount: "$99",  status: "failed",  date: "Feb 05, 2026" },
  { id: "15", customer: "Buy n Large",         email: "ceo@buynlarge.com",     plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 05, 2026" },
  // Sep 2025 — within 6M and 12M, outside 3M
  { id: "16", customer: "Acme Corp",          email: "billing@acme.com",      plan: "Pro",        amount: "$299", status: "paid",    date: "Sep 18, 2025" },
  { id: "17", customer: "Stark Industries",   email: "tony@stark.com",        plan: "Enterprise", amount: "$599", status: "paid",    date: "Sep 10, 2025" },
  { id: "18", customer: "Hooli",              email: "gavin@hooli.com",       plan: "Enterprise", amount: "$599", status: "failed",  date: "Sep 03, 2025" },
  // May 2025 — within 12M only
  { id: "19", customer: "Waystar Royco",      email: "logan@waystar.com",     plan: "Enterprise", amount: "$599", status: "paid",    date: "May 22, 2025" },
  { id: "20", customer: "Vandelay Industries",email: "art@vandelay.com",      plan: "Pro",        amount: "$299", status: "pending", date: "May 14, 2025" },
  { id: "21", customer: "Globex Inc",         email: "finance@globex.com",    plan: "Basic",      amount: "$99",  status: "paid",    date: "May 07, 2025" },
];
