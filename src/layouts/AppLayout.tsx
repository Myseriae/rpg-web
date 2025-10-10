import { Outlet } from "react-router-dom";
import SidebarLink from "../components/SideBarLink.tsx";
import { LayoutDashboard, Map} from "lucide-react";

export default function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[14rem_1fr] bg-zinc-900 text-zinc-100">
      {/* sidebar */}
      <aside className="border-r border-zinc-800 p-4">
        <h2 className="text-lg font-semibold mb-4">RPG Web</h2>

        <nav className="space-y-2 text-sm">
          <SidebarLink
            to="/"
            end
            icon={<LayoutDashboard size={16} />}
            label="Dashboard"
          />
          <SidebarLink to="/map" icon={<Map size={16} />} label="Map" />


          <NavLink
            to="/character-sheet"
            className={({ isActive }) =>
              "block rounded px-3 py-2 " +
              (isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-100")
            }
          >
            Character Sheet
          </NavLink>
          {/* TODO later: Inventory, Spells, Skill Tree */}
        </nav>
      </aside>

      {/* main content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
