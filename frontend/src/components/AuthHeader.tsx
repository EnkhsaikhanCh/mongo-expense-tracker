import { LogoSVG } from "./image/LogoSVG";

export function AuthHeader({ label }: { label: string }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <LogoSVG />
        <h1 className="text-2xl font-bold">Gelt</h1>
      </div>
      <div className="mb-3 mt-5 flex h-full flex-col gap-2">
        <h1 className="flex justify-center text-xl font-bold">{label}</h1>
      </div>
    </>
  );
}
