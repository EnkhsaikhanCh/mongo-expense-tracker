import React, { forwardRef } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

export const PasswordField = forwardRef<
  HTMLInputElement,
  {
    label: string;
    visible: boolean;
    value: string;
    onChange: (newValue: string) => void;
    toggleVisibility: () => void;
    showForgotPassword?: boolean;
  }
>(
  (
    { label, visible, value, onChange, toggleVisibility, showForgotPassword },
    ref,
  ) => {
    return (
      <div className="form-control gap-1">
        <div className="label p-0">
          <label className="label-text font-bold">{label}</label>
          {showForgotPassword && (
            <a href="/forgotPassword">
              <button className="btn btn-ghost label-text-alt btn-xs rounded-[3px] border-none font-semibold text-[#2F81F7] hover:bg-gray-100">
                Forget password?
              </button>
            </a>
          )}
        </div>
        <div className="relative w-full max-w-xs">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10 focus:border-blue-500 focus:outline-none focus:ring-1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={label}
          />
          <button
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <BiSolidHide size={15} /> : <BiSolidShow size={15} />}
          </button>
        </div>
      </div>
    );
  },
);
