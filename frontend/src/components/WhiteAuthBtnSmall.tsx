export function WhiteAuthBtnSmall({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="btn btn-sm rounded-[5px]" onClick={onClick}>
      {label}
    </button>
  );
}
