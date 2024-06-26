"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Fetcher, Mutator, useTransactions } from "@/app/utils";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import { AmountField } from "./AmountField";
import { CategorySelect } from "./CategorySelect";
import { DateField } from "./DateField";
import { ModalHeader } from "./ModalHeader";
import { Textarea } from "./Textarea";
import { TransactionType } from "./TransactionType";
import { ApiResponseError, Category } from "@/app/interface";

const getCurrentDateTime = () => {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm");
};

export function AddTransaction() {
  const [amount, setAmount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>(getCurrentDateTime());
  const [open, setOpen] = useState<boolean>(false);
  const [displayAmount, setDisplayAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const { loadTransactions } = useTransactions();

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  async function loadCategories() {
    try {
      const data: Category[] = await Fetcher("categories");
      setCategories(data);
      if (!categoryId && data.length > 0) setCategoryId(data[0].id);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories.");
    }
  }

  const validateForm = () => {
    if (!amount) {
      toast.warning("Please enter an amount.");
      return false;
    }

    if (!categoryId) {
      toast.warning("Please select a category.");
      return false;
    }

    return true;
  };

  function createTransaction() {
    if (!validateForm()) return;

    const adjustedAmount =
      transactionType === "expense"
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount));

    try {
      const promise = Mutator("transactions/create", {
        category_id: categoryId,
        amount: adjustedAmount,
        date: dateTime,
      });
      toast.promise(promise, {
        loading: "Creating transaction...",
        success: () => {
          loadTransactions();
          closeModal();
          resetForm();
          return "Transaction added successfully!";
        },
        error: (error: ApiResponseError) => {
          const message =
            error.response?.data?.message || "Error creating transaction.";
          toast.error(message);
          return message;
        },
      });
    } catch (error) {
      console.error("Unhandled error:", error);
      toast.error("An unexpected error occurred.");
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(numericValue))) {
      const formattedValue = parseFloat(numericValue).toLocaleString();
      setAmount(numericValue);
      setDisplayAmount(formattedValue);
    } else {
      setAmount("");
      setDisplayAmount("");
    }
  };

  const resetForm = () => {
    setDisplayAmount("");
    setCategoryId("");
    setAmount("");
    setDateTime(getCurrentDateTime());
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <div>
      <Toaster position="bottom-right" richColors />

      <button
        className="btn btn-neutral text-white md:btn-wide"
        onClick={openModal}
      >
        <FaPlus />
        Add record
      </button>

      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-2xl">
          <ModalHeader onClick={closeModal} />
          <div className="divider"></div>

          <div className="grid grid-cols-2 justify-between gap-3">
            <div className="flex flex-col justify-between">
              {/* Transaction type */}
              <TransactionType
                transactionType={transactionType}
                setTransactionType={setTransactionType}
              />

              <div className="flex flex-col gap-2">
                {/* Amount */}
                <AmountField
                  label="Amount"
                  type="text"
                  value={displayAmount}
                  onChange={handleAmountChange}
                />

                {/* Category */}
                <CategorySelect
                  label="Category"
                  value={categoryId}
                  onChange={setCategoryId}
                  categories={categories}
                />

                {/* Date */}
                <DateField
                  label="Date"
                  type="datetime-local"
                  value={dateTime}
                  onChange={setDateTime}
                />
              </div>
            </div>
            <div>
              <Textarea label="Note" />
            </div>
          </div>

          {/* Add transaction button */}
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                className="btn btn-neutral text-white md:btn-wide"
                onClick={createTransaction}
              >
                Add record
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
