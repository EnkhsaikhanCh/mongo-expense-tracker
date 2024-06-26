import { PiTrashDuotone } from "react-icons/pi";

export function CategoryCard({
  category,
  setCategoryId,
}: {
  category: { id: string; name: string };
  setCategoryId: (id: string) => void;
}) {
  return (
    <p
      key={category.id}
      className="mb-1 ml-2 flex items-center justify-between text-center"
    >
      {category.name}
      <button
        aria-label={`Delete category ${category.name}`}
        className="btn btn-ghost btn-sm w-8 p-0"
        onClick={() => setCategoryId(category.id)}
      >
        <PiTrashDuotone />
      </button>
    </p>
  );
}
