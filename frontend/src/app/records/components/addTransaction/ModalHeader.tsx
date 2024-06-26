import { ModalHeaderProps } from "@/app/interface";
import { IoClose } from "react-icons/io5";

export function ModalHeader({ onClick }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Add Record</h2>
      <button className="btn btn-sm w-[30px] p-0" onClick={onClick}>
        <IoClose />
      </button>
    </div>
  );
}
