export function Textarea({ label }: { label: string }) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-[#808080]">{label}</span>
      </div>
      <textarea
        cols={40}
        rows={6}
        placeholder="Write here"
        className="textarea textarea-bordered w-full resize-none rounded-md bg-[#F3F4F6] p-2  focus:border-blue-500 focus:outline-none focus:ring-1"
      ></textarea>
    </label>
  );
}
