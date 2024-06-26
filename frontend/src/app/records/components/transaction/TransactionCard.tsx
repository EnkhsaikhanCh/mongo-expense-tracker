import { TransactionType } from "@/app/interface";
import dayjs from "dayjs";
import { GrHomeRounded } from "react-icons/gr";
import { PiTrashDuotone } from "react-icons/pi";

export function TransactionCard({
  transaction,
  setTransactionId,
}: {
  transaction: TransactionType;
  setTransactionId: (id: string) => void;
}) {
  function parseAmount(amountString: string): number {
    const numericValue = Number(amountString.replace(/[^0-9.-]+/g, ""));
    return numericValue;
  }

  function getAmountClassName(amount: string) {
    const amountNumber = parseAmount(amount);
    return amountNumber < 0
      ? "rounded-md border border-red-300 bg-rose-100 px-3 font-semibold"
      : "rounded-md border border-emerald-300 bg-emerald-100 px-3 font-semibold";
  }

  return (
    <div
      key={transaction.id}
      className="flex justify-between rounded-md bg-white py-4 pr-4"
    >
      <div className="flex">
        <div className="flex w-14 items-center justify-center">
          <GrHomeRounded />
        </div>
        <div>
          <h1 className="text-lg">{transaction.category_name}</h1>
          <p className="text-sm text-[#6B7280]">
            {dayjs(transaction.date).format("HH:mm")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <span className={getAmountClassName(transaction.amount)}>
          {transaction.amount}
        </span>
        <button
          aria-label={`Delete transaction ${transaction.amount}`}
          className="btn h-[48px] w-[48px] px-[10px]"
          onClick={() => setTransactionId(transaction.id)}
        >
          <PiTrashDuotone className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  );
}
