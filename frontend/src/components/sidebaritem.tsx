import { ReactElement } from "react";

export function Sidebaritem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 cursor-pointer hover:bg-slate-200 rounded ">
      <div className="pr-2 m-2">{icon}</div>
      <div className="m-2">{text}</div>
    </div>
  );
}