import { useEffect, useState } from "react";
import { Fetcher } from "@/app/utils";
import { toast } from "sonner";

interface CategoryDeleteModalProps {
  categoryId: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function CategoryDeleteModal({
  onConfirm,
  categoryId,
  onClose,
}: CategoryDeleteModalProps) {
  const [name, setName] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await Fetcher(`categories/${categoryId}`);
      setName(response.name);
    } catch (error: any) {
      toast.error("Failed to fetch category", error);
    }
  };

  useEffect(() => {
    setName("");
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  return (
    <dialog
      id="my_modal_1"
      className={`modal ${categoryId ? "modal-open" : ""}`}
    >
      <div className="modal-box text-lg">
        <p className="pb-4">Are you sure you want to delete this category?</p>
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
