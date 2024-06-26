"use client";

import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Mutator, useCategories } from "@/app/utils";
import { toast } from "sonner";
import { ApiResponseError, ModalHeaderProps } from "@/app/interface";

export function AddCategory() {
  const { loadCategories } = useCategories();
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function createCategory() {
    if (!name) {
      toast.warning("Name field is required");
      return false;
    }

    try {
      const promise = Mutator("categories/create", {
        name: name,
      });
      toast.promise(promise, {
        loading: "Creating category...",
        success: () => {
          loadCategories();
          closeModal();
          setName("");
          return "Category created successfully!";
        },
        error: (error: ApiResponseError) => {
          const message =
            error.response?.data?.message || "Error creating category.";
          return message;
        },
      });
    } catch (error) {
      console.error("Unhandled error:", error);
      toast.error("An unexpected error occurred.");
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <button className="btn btn-sm mt-2" onClick={openModal}>
        <FaPlus />
        Add Category
      </button>

      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          {/* Header */}
          <ModalHeader onClick={closeModal} />

          {/* Name */}
          <NewCategoryNameInput value={name} onChange={setName} />

          {/* Add category button */}
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                className="btn btn-neutral text-white"
                onClick={createCategory}
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ModalHeader({ onClick }: ModalHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-bold">Add Category</h2>
      <button
        className="btn btn-sm w-[30px] p-0"
        // onClick={() => setIsModalOpen(false)}
        onClick={onClick}
      >
        <IoClose />
      </button>
    </div>
  );
}

function NewCategoryNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <label className="input input-bordered flex w-full  items-center gap-2 bg-[#F3F4F6] focus:outline-none">
      <div>
        <p className="text-sm text-[#808080]">Name</p>
      </div>
      <input
        type="text"
        className=""
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
