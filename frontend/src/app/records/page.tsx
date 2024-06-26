"use client";

import ProtectedRoute from "@/hoc/ProtectedRoute";
import { AddTransaction } from "./components/addTransaction/AddTransactions";
import { AddCategory } from "./components/category/AddCategory";
import { CategoriesList } from "./components/category/CategoryList";
import { TransactionList } from "./components/transaction/TransactionList";

export default function Records() {
  return (
    <ProtectedRoute>
      <main className="container mx-auto mt-4 flex flex-col justify-between gap-2 px-4 md:flex-row lg:w-[1000px]">
        <div className="flex flex-col rounded-md bg-white p-2">
          <AddTransaction />
          <CategoriesList />
          <AddCategory />
        </div>
        <TransactionList />
      </main>
    </ProtectedRoute>
  );
}
