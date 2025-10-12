import { useMemo, useState } from "react";
import type { NodeId } from "../features/skilltree/types";
import { TREE } from "../features/skilltree/data";
import SkillTreeCanvas from "../features/skilltree/components/SkillTreeCanvas";

export default function SkillTree() {
  // Map of nodeId -> current rank
  const [ranks, setRanks] = useState<Map<NodeId, number>>(new Map());

  // Fast lookup
  const byId = useMemo(
    () => new Map(TREE.nodes.map((n) => [n.id, n])),
    []
  );

  // Total points spent = sum of ranks (costPerRank is 1 for now)
  const spent = useMemo(
    () => TREE.nodes.reduce((sum, n) => sum + (ranks.get(n.id) ?? 0), 0),
    [ranks]
  );

  // Tier gating: unlock tier t (1-based) when spent >= tierRequirements[t-1]
  const tierUnlocked = (t: number) =>
    spent >= (TREE.tierRequirements[t - 1] ?? Number.POSITIVE_INFINITY);

  // Can rank up a node?
  const canRankUp = (id: NodeId) => {
    const n = byId.get(id)!;
    const r = ranks.get(id) ?? 0;
    if (r >= n.maxRank) return false;
    if (!tierUnlocked(n.tier)) return false;
    return true;
  };

  // Click handler: increment rank if allowed
  const onNodeClick = (id: NodeId) => {
    if (!canRankUp(id)) return;
    setRanks((prev) => {
      const next = new Map(prev);
      next.set(id, (next.get(id) ?? 0) + 1);
      return next;
    });
  };

  // Progress summary for header
  const maxTier = Math.max(...TREE.nodes.map((n) => n.tier));
  const nextTier = Math.min(
    ...[...Array(maxTier + 1).keys()]
      .slice(1) // tiers are 1..maxTier
      .filter((t) => !tierUnlocked(t))
      .concat(maxTier + 1)
  );
  const nextReq = TREE.tierRequirements[(nextTier - 1) | 0] ?? 0;

  return (
    <section className="p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skill Tree</h1>
        <div className="text-sm text-zinc-400">
          Spent: <span className="text-zinc-200">{spent}</span>
          {nextTier <= maxTier && (
            <>
              {" "}| Next tier {nextTier} at{" "}
              <span className="text-zinc-200">{nextReq}</span>
            </>
          )}
        </div>
      </header>

      <SkillTreeCanvas
        tree={TREE}
        ranks={ranks}
        canRankUp={canRankUp}
        onNodeClick={onNodeClick}
        spent={spent}
      />
    </section>
  );
}
