export function TransactionSkeleton() {
  return (
    <div className="flex w-full flex-col justify-between gap-3 md:flex-row lg:w-[1000px]">
      <div className="card flex w-full gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full animate-pulse justify-between rounded-md bg-[#E5E6E6] px-4 py-4"
          >
            <div className="flex items-center">
              <div className="skeleton h-10 w-10 rounded-full bg-gray-300"></div>
              <div className="ml-4 flex flex-col">
                <div className="skeleton h-6 w-48 rounded bg-gray-300"></div>
                <div className="skeleton mt-2 h-6 w-32 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="skeleton h-8 w-20 rounded-md bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
