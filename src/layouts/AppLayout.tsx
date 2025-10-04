import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[14rem_1fr] bg-zinc-900 text-zinc-100">
      {/* sidebar */}
      <aside className="border-r border-zinc-800 p-4">
        <h2 className="text-lg font-semibold mb-4">RPG Web</h2>

        <nav className="space-y-2 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "block rounded px-3 py-2 " +
              (isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-100")
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              "block rounded px-3 py-2 " +
              (isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-100")
            }
          >
            Map
          </NavLink>

          {/* TODO later: Character, Inventory, Spells, Skill Tree */}
        </nav>
      </aside>

      {/* main content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
