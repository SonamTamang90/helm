"use client";

import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import type { Transaction } from "@/types/transaction";
import { transactionStatusVariant } from "@/constants/status";
import { allCustomers } from "@/constants/customers";

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const CloseIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRightIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  const customer = transaction
    ? allCustomers.find((c) => c.name === transaction.customer)
    : null;

  return (
    <Modal open={!!transaction} onClose={onClose}>
      {transaction && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="text-sm font-medium text-foreground">Transaction</p>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center rounded text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              {CloseIcon}
            </button>
          </div>

          {/* Amount + status */}
          <div className="flex flex-col items-center gap-2 border-b border-border px-5 py-6">
            <p className="text-3xl font-semibold text-foreground">{transaction.amount}</p>
            <Badge label={transaction.status} variant={transactionStatusVariant[transaction.status]} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 px-5 py-5">
            <div>
              <p className="text-xs text-muted">Customer</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{transaction.customer}</p>
              <p className="text-xs text-muted">{transaction.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted">Plan</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{transaction.plan}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Date</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{transaction.date}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted">Transaction ID</p>
              <p className="mt-0.5 font-mono text-xs text-muted">
                TXN-{transaction.id.padStart(3, "0")}
              </p>
            </div>
          </div>

          {/* Footer */}
          {customer && (
            <div className="border-t border-border px-5 py-4">
              <Link
                href={`/customers/${customer.id}`}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-1.5 rounded border border-border bg-surface px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
              >
                View Customer Profile
                {ChevronRightIcon}
              </Link>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
