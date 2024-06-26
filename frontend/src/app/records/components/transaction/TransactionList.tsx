"use client";

import { useEffect, useState } from "react";
import { Deleter, useTransactions } from "@/app/utils";
import axios from "axios";
import { TransactionSkeleton } from "./TransactionSkeleton";
import { TransactionCard } from "./TransactionCard";
import { Toaster, toast } from "sonner";
import { TransactionDeleteModal } from "./TransactionDeleteModal";

export function TransactionList() {
  const { transactions, loadTransactions, isLoading, error } =
    useTransactions();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await Deleter(`transactions/${transactionId}`);
      toast.success("Transaction successfully delete");
      loadTransactions();
    } catch (error: any) {
      console.error("Failed to delete transaction", error);
      toast.error(
        "Failed to delete category: " +
          (error.response?.data.message || "Unknown error"),
      );
    } finally {
      setTransactionId(null);
    }
  };

  if (error) {
    return <div>Error loading transactions.</div>;
  }

  if (transactions === null) {
    return <TransactionSkeleton />;
  }

  if (transactions.length === 0) {
    return (
      <div className="mt-3 text-center font-semibold text-gray-500 md:w-[1000px]">
        No transactions found.
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-3 place-self-start md:flex-row lg:w-[1000px]">
        <Toaster position="bottom-right" richColors />

        <div className="card flex w-full gap-2 ">
          {isLoading ? (
            <TransactionSkeleton />
          ) : (
            <>
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  setTransactionId={setTransactionId}
                />
              ))}
            </>
          )}

          {transactionId && (
            <TransactionDeleteModal
              transactionId={transactionId}
              onClose={() => setTransactionId(null)}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}
