export function AuthFooter({
  label,
  href,
  text,
}: {
  label: string;
  href: string;
  text: string;
}) {
  return (
    <div className="card w-full rounded-md border bg-white">
      <div className="card-body px-[17px] py-[20px]">
        <span className="flex items-center justify-center gap-3">
          {text}
          <a href={href}>
            <button className="btn btn-sm rounded-[5px] border-none bg-gray-100 text-[#2F81F7] shadow-none hover:bg-gray-200">
              {label}
            </button>
          </a>
        </span>
      </div>
    </div>
  );
}
