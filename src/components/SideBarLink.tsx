import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "../utils/cn.ts"; // we'll add this helper in step 3C; for now, just inline classes.

type Props = {
  to: NavLinkProps["to"];
  end?: boolean;
  icon?: React.ReactNode;
  label: string;
};

export default function SidebarLink({ to, end, icon, label }: Props) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors",
          "border-l-2 border-transparent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/400",
          isActive
            ? "bg-zinc-800 text-white border-l-zinc-500"
            : "text-zinc-400 hover:text-zinc-100 hover:border-l-zinc-800/60"
          )
      }
      aria-label={label}
    >
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      <span className="truncate">{label}</span>
    </NavLink>
  );
}