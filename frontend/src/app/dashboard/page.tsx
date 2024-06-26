import ProtectedRoute from "@/hoc/ProtectedRoute";
import { CashWidget } from "./components/CashWidget";
import { ExpenseWidget } from "./components/ExpenseWidget";
import { IncomeWidget } from "./components/IncomeWidget";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className="container mx-auto flex justify-center">
        <div className="mx-4 mt-5 flex snap-x gap-3 overflow-x-auto scroll-smooth">
          <div className="snap-center">
            <CashWidget />
          </div>
          <div className="snap-center">
            <IncomeWidget />
          </div>
          <div className="snap-center">
            <ExpenseWidget />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
