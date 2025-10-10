import { Outlet } from "react-router-dom";
import SideBarLink from "../components/SideBarLink.tsx";
import {
  LayoutDashboard,
  Map,
  PersonStanding,
  BookOpenText,
  CircleDotDashed,
} from "lucide-react";

export default function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[14rem_1fr] bg-zinc-900 text-zinc-100">
      {/* sidebar */}
      <aside className="border-r border-zinc-800 p-4">
        <h2 className="text-lg font-semibold mb-4">RPG Web</h2>

        <nav className="space-y-2 text-sm">
          <SideBarLink
            to="/"
            end
            icon={<LayoutDashboard size={16} />}
            label="Dashboard"
          />
          <SideBarLink to="/map" icon={<Map size={16} />} label="Map" />
          <SideBarLink
            to="/character-sheet"
            label="Character Sheet"
            icon={<PersonStanding size={16} />}
          />
          <SideBarLink
            to="/spells"
            label="Spells"
            icon={<BookOpenText size={16} />}
          />
          <SideBarLink
            to="/skill-tree"
            label="Skill Tree"
            icon={<CircleDotDashed size={16} />}
          />
          {/* TODO later: Fighter tab */}
        </nav>
      </aside>

      {/* main content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
