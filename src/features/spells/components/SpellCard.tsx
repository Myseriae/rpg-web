import type { Spell } from "../types.ts";

export default function SpellCard({ spell }: { spell: Spell }) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 hover:bg-zinc-900 transition-colors">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{spell.name}</h3>
          <p className="text-xs text-zinc-400">
            Level:{spell.level} • {spell.element}
          </p>
        </div>
        <span className="text-xs rounded px-2 py-1 bg-zinc-800 text-zinc-300">
          {spell.manaCost} MP
        </span>
      </header>

      <p className="mt-3 text-sm text-zinc-300 line-clamp-3">
        {spell.description}
      </p>

      {/* TODO: render tags as small chips; e.g., damage/aoe/control */}
      {/* Tip: map spell.tags to <span className="text-[10px] ..."> */}
      <footer className="mt-3 text-[13px] text-zinc-400">
        Range: {spell.range} • Casting Time: {spell.castingTime}
      </footer>
    </article>
  );
}
