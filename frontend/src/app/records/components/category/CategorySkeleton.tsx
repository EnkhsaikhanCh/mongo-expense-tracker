export function CategorySkeleton() {
  return (
    <div className="mt-2 flex flex-col gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton h-[30px] w-full rounded-md"></div>
      ))}
    </div>
  );
}
