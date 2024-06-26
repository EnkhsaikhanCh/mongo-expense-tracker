export function DateField({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: string;
  type: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <div className="flex gap-1">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-[#808080]">{label}</span>
        </div>
        <input
          type={type}
          value={value}
          className="input input-bordered w-full max-w-xs bg-[#F3F4F6] text-[#808080]  focus:border-blue-500 focus:outline-none focus:ring-1"
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
