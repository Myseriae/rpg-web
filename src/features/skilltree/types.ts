// Skill tree types — Borderlands-style (tiers + ranks)

export type NodeId = string; // kebab-case slug, e.g. "fire-resistance"

export type SkillKind = "start" | "passive" | "keystone";

export type SkillNode = {
  id: NodeId;                 // stable slug, e.g. "fire-resistance"
  displayName: string;        // label to show in UI
  kind: SkillKind;            // "start" | "passive" | "keystone"
  tier: number;               // 0 = top row, then 1, 2, ...
  maxRank: number;            // 1 for keystones, 3/5 for passives
  costPerRank: number;        // always 1 for now (left for future flexibility)
  pos: { x: number; y: number }; // logical SVG coords (same 1000x1000 viewBox)
  // optional metadata
  description?: string;
  tags?: string[];
};

export type SkillTree = {
  nodes: SkillNode[];
  /**
   * Tier thresholds: total points required to unlock the given tier.
   * Example: [0, 0, 5, 10, 15] means:
   *  - Tier 0 unlocked at 0 spent
   *  - Tier 1 unlocked at 0 spent
   *  - Tier 2 unlocked at 5 spent
   *  - Tier 3 unlocked at 10 spent
   *  - Tier 4 unlocked at 15 spent
   */
  tierRequirements: number[];
};
