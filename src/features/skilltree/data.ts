import type { SkillTree, SkillNode, NodeId } from "./types";

/** Simple grid helpers for positioning nodes by column/tier. */
const VIEW = { W: 1000, H: 1000 };
const GRID = {
  x: (col: number) => 200 + col * 200, // ~200px apart horizontally
  y: (tier: number) => 140 + (tier - 1) * 180, // tier 1 starts near top
};

// Convenience builder to keep data tidy.
function node(
  id: NodeId,
  displayName: string,
  kind: "passive" | "keystone",
  tier: number,
  maxRank: number,
  col: number,
  opts?: Partial<Pick<SkillNode, "description" | "tags">>
): SkillNode {
  return {
    id,
    displayName,
    kind,
    tier,
    maxRank,
    costPerRank: 1,
    pos: { x: GRID.x(col), y: GRID.y(tier) },
    ...opts,
  };
}

/** Tier thresholds (cumulative points spent in this tree). */
export const TIER_REQ: number[] = [0, 5, 10, 15];

// --- Example dataset (edit/expand freely) ------------------------------------

const nodes: SkillNode[] = [
  // Tier 1 (free to access)
  node("fire-resistance", "Fire Resistance", "passive", 1, 5, 1, {
    description: "+% fire resist per rank",
    tags: ["fire", "defense"],
  }),
  node("ice-penetration", "Ice Penetration", "passive", 1, 5, 2, {
    description: "+% ice penetration per rank",
    tags: ["ice", "offense"],
  }),
  node("arcane-efficiency", "Arcane Efficiency", "passive", 1, 3, 3, {
    description: "Reduce mana costs per rank",
    tags: ["arcane", "utility"],
  }),

  // Tier 2 (requires 5 points spent)
  node("elemental-overload", "Elemental Overload", "passive", 2, 5, 1, {
    description: "+% elemental damage per rank",
    tags: ["offense"],
  }),
  node("warding", "Warding", "passive", 2, 3, 3, {
    description: "Incoming damage reduced per rank",
    tags: ["defense"],
  }),

  // Tier 3 (requires 10 points spent) — Keystone
  node("runic-convergence", "Runic Convergence", "keystone", 3, 1, 2, {
    description:
      "Keystone: Converts non-physical damage into your dominant element.",
    tags: ["keystone"],
  }),
];

export const TREE: SkillTree = {
  nodes,
  tierRequirements: TIER_REQ,
};

export { VIEW, GRID };
