"use client";

import { useEffect, useState } from "react";
import { Fetcher } from "@/app/utils";
import { DotSVG } from "@/components/image/DotSVG";
import { DownVectorSVG } from "@/components/image/DownVectorSVG";

interface expenseSumType {
  expenseSum: number;
}

export function ExpenseWidget() {
  const [totalAmount, setTotalAmount] = useState<expenseSumType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getTotalAmount() {
    setIsLoading(true);
    try {
      const response = await Fetcher("transactions/totalAmount");
      setTotalAmount(response);
    } catch {
      console.log("Failed to fetch total amount:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTotalAmount();
  }, []);

  function formatCurrency(value: number) {
    if (value === null) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return (
    <div className="card h-[200px] w-96 bg-white shadow-sm">
      <div className="card-body flex justify-between  px-0 pb-5 pt-4">
        <div className="flex items-center gap-2 border-b-[1px] px-8 pb-2">
          <DotSVG />
          <h2 className="card-title">Total Expense</h2>
        </div>
        <div className="flex h-[120px] flex-col justify-between gap-4 px-8 pt-2">
          <div>
            <div className="flex h-10 w-fit justify-center rounded-md border border-red-300 bg-red-100 px-3 text-3xl font-semibold">
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : error ? (
                <span className="text-red-500">Error fetching data</span>
              ) : totalAmount ? (
                <span>{formatCurrency(totalAmount.expenseSum)}</span>
              ) : null}
            </div>

            <p className="mt-1 text-lg text-gray-400">Your Expense Amount</p>
          </div>
          <div className="flex items-center gap-2">
            <DownVectorSVG />
            <p>32% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
