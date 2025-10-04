import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "../utils/cn"; // we'll add this helper in step 3C; for now, just inline classes.

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
        [
          "group flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors",
          isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-100",
          // TODO(1): when active, also show a left border: try "border-l-2 border-zinc-500"
          isActive ? "" : "",
        ].join(" ")
      }
      aria-label={label}
    >
      {/* TODO(2): render the icon (if provided) at 16px size, then the label in a <span> */}
      {label}
    </NavLink>
  );
}
