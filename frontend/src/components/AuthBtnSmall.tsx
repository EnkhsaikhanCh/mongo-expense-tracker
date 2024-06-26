import { FaArrowRightLong } from "react-icons/fa6";

export function AuthBtnSmall({
  label,
  onClick,
  disabled,
  showArrow,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  showArrow?: boolean;
}) {
  return (
    <button
      className="btn btn-neutral btn-sm w-full rounded-[5px] text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {showArrow && <FaArrowRightLong />}
    </button>
  );
}
