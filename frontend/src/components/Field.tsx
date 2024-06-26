import React, { forwardRef } from "react";

export const Field = forwardRef<
  HTMLInputElement,
  {
    label: string;
    type: string;
    value: string;
    onChange: (newValue: string) => void;
  }
>(({ label, type, value, onChange }, ref) => {
  return (
    <div className="form-control gap-1">
      <label className="label-text font-bold">{label}</label>
      <input
        ref={ref}
        type={type}
        className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5] focus:border-blue-500 focus:outline-none focus:ring-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
    </div>
  );
});
