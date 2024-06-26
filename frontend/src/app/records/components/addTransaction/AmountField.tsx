export function AmountField({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-[#808080]">{label}</span>
      </div>
      <input
        type={type}
        className="input input-bordered bg-[#F3F4F6] focus:border-blue-500 focus:outline-none focus:ring-1"
        placeholder="₮ 000.00"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
