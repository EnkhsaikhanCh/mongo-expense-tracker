export function TransactionType({
  transactionType,
  setTransactionType,
}: {
  transactionType: string;
  setTransactionType: (type: "expense" | "income") => void;
}) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-1">
      <button
        className={`btn ${transactionType === "expense" ? "border border-red-300 bg-rose-100 px-3 font-semibold hover:border-red-300 hover:bg-rose-100" : "hover:border-red-300 hover:bg-rose-100"}`}
        onClick={() => setTransactionType("expense")}
      >
        Expense
      </button>
      <button
        className={`btn ${transactionType === "income" ? "border border-emerald-300 bg-emerald-100 px-3 font-semibold hover:border-emerald-300 hover:bg-emerald-100" : "hover:border-emerald-300 hover:bg-emerald-100"}`}
        onClick={() => setTransactionType("income")}
      >
        Income
      </button>
    </div>
  );
}
