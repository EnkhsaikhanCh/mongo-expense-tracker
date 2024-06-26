import { Fetcher } from "@/app/utils";
import { useEffect } from "react";
import { toast } from "sonner";

interface TransactionDeleteModalProps {
  transactionId: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function TransactionDeleteModal({
  onConfirm,
  transactionId,
  onClose,
}: TransactionDeleteModalProps) {
  const fetchTransaction = async () => {
    try {
      await Fetcher(`transactions/${transactionId}`);
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  return (
    <dialog
      id="my_modal_1"
      className={`modal ${transactionId ? "modal-open" : ""}`}
    >
      <div className="modal-box text-lg">
        <p className="pb-4">
          Are you sure you want to delete this transaction?
        </p>
        <div className="flex justify-end">
          <button
            className="btn mr-2 rounded-md border-none bg-red-500 font-bold text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="btn rounded-md border-none bg-gray-300 text-black shadow-none hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
