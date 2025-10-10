import { useMemo, useState } from "react";
import { SPELLS } from "../features/spells/data.ts";
import SpellCard from "../features/spells/components/SpellCard.tsx";

const LEVELS: (number | "All")[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "All"];

function Spells() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<number | "All">("All");

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    return SPELLS.filter((spell) => {
      const matchesQuery =
        spell.name.toLowerCase().includes(query) ||
        spell.description.toLowerCase().includes(query) ||
        spell.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesLevel = level === "All" || spell.level === level;

      return matchesQuery && matchesLevel;
    });
  }, [q, level]);
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Spells</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, description, tags..."
        />
        <select
          value={String(level)}
          onChange={(e) => {
            const v = e.target.value;
            setLevel(v === "All" ? "All" : Number(v));
          }}
        >
          {LEVELS.map((lvl) => (
            <option key={String(lvl)} value={String(lvl)}>
              {String(lvl)}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((spell) => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Showing {filtered.length} / {SPELLS.length} spells
      </p>
    </section>
  );
}

export default Spells;
