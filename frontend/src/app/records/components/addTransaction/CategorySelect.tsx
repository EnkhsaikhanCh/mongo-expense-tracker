import { Category } from "@/app/interface";

export function CategorySelect({
  label,
  value,
  onChange,
  categories,
}: {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  categories: Category[];
}) {
  return (
    <label>
      <div className="label">
        <p className="label-text text-[#808080]">{label}</p>
      </div>
      <select
        name="category"
        id="category-select"
        className="select select-bordered w-full max-w-xs bg-[#F3F4F6] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))
        ) : (
          <option>No categories available</option>
        )}
      </select>
    </label>
  );
}
