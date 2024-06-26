"use client";

import { useEffect, useState } from "react";
import { Deleter, useCategories } from "@/app/utils";
import { Toaster, toast } from "sonner";
import { CategorySkeleton } from "./CategorySkeleton";
import { CategoryDeleteModal } from "./CategoryDeleteModal";
import { CategoryCard } from "./CategoryCard";

export function CategoriesList() {
  const { categories, loadCategories, isLoading, error } = useCategories();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await Deleter(`categories/${categoryId}`);
      toast.success("Category successfully deleted");
      loadCategories();
    } catch (error: any) {
      console.error("Failed to delete category", error);
      toast.error(
        "Failed to delete category: " +
          (error.response?.data.message || "Unknown error"),
      );
    } finally {
      setCategoryId(null);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (categories === null) {
    return <CategorySkeleton />;
  }

  if (categories.length === 0) {
    return (
      <div className="my-3 text-center text-sm font-semibold text-gray-500">
        No categories found.
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col">
      <Toaster position="bottom-right" richColors />
      <h1 className="font-bold">Category</h1>

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              setCategoryId={setCategoryId}
            />
          ))}
        </>
      )}

      {categoryId && (
        <CategoryDeleteModal
          categoryId={categoryId}
          onClose={() => setCategoryId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
