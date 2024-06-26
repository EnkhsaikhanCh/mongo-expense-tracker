"use client";

import { useEffect, useState } from "react";
import { ChipSVG } from "@/components/image/ChipSVG";
import { LogoSVG } from "@/components/image/LogoSVG";
import { Fetcher } from "@/app/utils";

export function CashWidget() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getNetBalance() {
    setIsLoading(true);
    try {
      const response = await Fetcher("transactions/balance");
      console.log("API Response:", response);
      setBalance(response.netBalance);
      setError(false);
    } catch (error) {
      console.error("Failed to fetch net balance:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getNetBalance();
  }, []);

  return (
    <div className="card h-[200px] w-[384px] bg-neutral text-white shadow-sm">
      <div className="card-body flex justify-between">
        <div className="flex gap-2">
          <LogoSVG />
          <h2 className="card-title">Gelt</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Balance</p>
            {isLoading ? (
              <div className="flex h-[32px] items-center">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : error ? (
              <p className="text-red-500">Error fetching balance</p>
            ) : (
              balance !== null && <p className="text-2xl">{balance}</p>
            )}
          </div>
          <div>
            <ChipSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
