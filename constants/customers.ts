import type { Customer } from "@/types/customer";

export const allCustomers: Customer[] = [
  { id: "1",  name: "Acme Corp",          email: "billing@acme.com",      plan: "Pro",        mrr: "$299",  ltv: "$3,588",  status: "active",  joined: "Mar 2024" },
  { id: "2",  name: "Globex Inc",          email: "finance@globex.com",    plan: "Basic",      mrr: "$99",   ltv: "$1,188",  status: "active",  joined: "Apr 2024" },
  { id: "3",  name: "Initech",             email: "accounts@initech.com",  plan: "Enterprise", mrr: "$599",  ltv: "$7,188",  status: "trial",   joined: "Jan 2026" },
  { id: "4",  name: "Umbrella Co",         email: "billing@umbrella.com",  plan: "Pro",        mrr: "$299",  ltv: "$1,196",  status: "churned", joined: "Jun 2024" },
  { id: "5",  name: "Stark Industries",    email: "tony@stark.com",        plan: "Enterprise", mrr: "$599",  ltv: "$14,376", status: "active",  joined: "Jan 2024" },
  { id: "6",  name: "Bluth Company",       email: "gob@bluth.com",         plan: "Basic",      mrr: "$99",   ltv: "$594",    status: "active",  joined: "Sep 2024" },
  { id: "7",  name: "Pied Piper",          email: "richard@piedpiper.com", plan: "Pro",        mrr: "$299",  ltv: "$897",    status: "trial",   joined: "Feb 2026" },
  { id: "8",  name: "Hooli",               email: "gavin@hooli.com",       plan: "Enterprise", mrr: "$599",  ltv: "$10,782", status: "active",  joined: "Feb 2024" },
  { id: "9",  name: "Dunder Mifflin",      email: "michael@dm.com",        plan: "Basic",      mrr: "$99",   ltv: "$693",    status: "churned", joined: "Jul 2024" },
  { id: "10", name: "Vandelay Industries", email: "art@vandelay.com",      plan: "Pro",        mrr: "$299",  ltv: "$5,382",  status: "active",  joined: "May 2023" },
  { id: "11", name: "Prestige Worldwide",  email: "boats@prestige.com",    plan: "Basic",      mrr: "$99",   ltv: "$1,485",  status: "active",  joined: "Nov 2023" },
  { id: "12", name: "Waystar Royco",       email: "logan@waystar.com",     plan: "Enterprise", mrr: "$599",  ltv: "$21,564", status: "active",  joined: "Aug 2022" },
  { id: "13", name: "Cyberdyne Systems",   email: "miles@cyberdyne.com",   plan: "Pro",        mrr: "$299",  ltv: "$598",    status: "trial",   joined: "Feb 2026" },
  { id: "14", name: "Soylent Corp",        email: "nate@soylent.com",      plan: "Basic",      mrr: "$99",   ltv: "$396",    status: "churned", joined: "Oct 2024" },
  { id: "15", name: "Buy n Large",         email: "ceo@buynlarge.com",     plan: "Enterprise", mrr: "$599",  ltv: "$8,386",  status: "active",  joined: "Mar 2023" },
];
