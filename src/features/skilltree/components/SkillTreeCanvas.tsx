import { useMemo } from "react";
import type { SkillTree, SkillNode, NodeId } from "../types";

/**
 * Borderlands-style canvas:
 * - One big vertical "charging" fill behind the whole tree (downwards)
 * - Square nodes (2.5× larger)
 * - Name shown larger; rank fraction appears next to the name on the same line
 * - No start node, no connection lines
 */
type Props = {
  tree: SkillTree;
  ranks: Map<NodeId, number>;
  canRankUp: (id: NodeId) => boolean;
  onNodeClick: (id: NodeId) => void;
  spent: number; // total points spent in this tree
};

const VIEWBOX = { W: 1000, H: 1000 };

// 2.5× larger visual sizes
const NODE_SIZE = (kind: SkillNode["kind"]) =>
  kind === "keystone" ? 75 : 60; // keystones slightly larger

const LABEL_OFFSET = 20; // title line above
// rank is now shown inline with name via <tspan>, so no below-offset.

export default function SkillTreeCanvas({
  tree,
  ranks,
  canRankUp,
  onNodeClick,
  spent,
}: Props) {
  // Compute a loose bounding box of nodes for the background container/fill
  const bounds = useMemo(() => {
    if (tree.nodes.length === 0) {
      return { x: 80, y: 80, width: VIEWBOX.W - 160, height: VIEWBOX.H - 160 };
    }
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    for (const n of tree.nodes) {
      minX = Math.min(minX, n.pos.x);
      maxX = Math.max(maxX, n.pos.x);
      minY = Math.min(minY, n.pos.y);
      maxY = Math.max(maxY, n.pos.y);
    }

    const padX = 100;
    const padY = 100;
    const x = Math.max(40, minX - padX);
    const y = Math.max(40, minY - padY);
    const width = Math.min(VIEWBOX.W - x - 40, (maxX - minX) + padX * 2);
    const height = Math.min(VIEWBOX.H - y - 40, (maxY - minY) + padY * 2);

    return { x, y, width, height };
  }, [tree.nodes]);

  // Overall vertical progress fill = spent / max(tierRequirements)
  const maxReq = useMemo(
    () => (tree.tierRequirements.length ? Math.max(...tree.tierRequirements) : 0),
    [tree.tierRequirements]
  );
  const progress = maxReq <= 0 ? 1 : Math.min(spent / maxReq, 1);

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.W} ${VIEWBOX.H}`}
      className="w-full h-[680px] bg-zinc-950 rounded-xl border border-zinc-800"
    >
      {/* Background container */}
      <rect
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        rx={16}
        fill="#0b0f19"
        fillOpacity={0.35}
        stroke="#27272a"
        strokeWidth={1}
      />

      {/* Vertical overall "charging" fill (top -> down) */}
      <clipPath id="treeArea">
        <rect
          x={bounds.x}
          y={bounds.y}
          width={bounds.width}
          height={bounds.height}
          rx={16}
        />
      </clipPath>
      <g clipPath="url(#treeArea)">
        <rect
          x={bounds.x}
          y={bounds.y}
          width={bounds.width}
          height={bounds.height * progress}
          fill="#1d4ed8"
          fillOpacity={0.22}
        />
      </g>

      {/* Progress percentage label (top-right of container) */}
      <text
        x={bounds.x + bounds.width}
        y={bounds.y - 10}
        textAnchor="end"
        fontSize={12}
        fill="#93c5fd"
      >
        Tree progress: {maxReq ? Math.floor(progress * 100) : 100}%
      </text>

      {/* Nodes (squares) */}
      {tree.nodes.map((n) => {
        const size = NODE_SIZE(n.kind);
        const half = size / 2;
        const rank = ranks.get(n.id) ?? 0;

        const can = canRankUp(n.id);

        // Visual state
        const fill = rank > 0 ? "#eab308" : "#3f3f46";
        const stroke = can ? "#a3a3a3" : "#0a0a0a";
        const cursor = can ? "pointer" : "default";
        const corner = n.kind === "keystone" ? 8 : 6;

        return (
          <g key={n.id}>
            {/* Node square */}
            <rect
              x={n.pos.x - half}
              y={n.pos.y - half}
              width={size}
              height={size}
              rx={corner}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
              style={{ cursor }}
              onClick={() => onNodeClick(n.id)}
            />

            {/* Title + rank fraction on the same line above the node */}
            <text
              x={n.pos.x}
              y={n.pos.y - half - LABEL_OFFSET}
              textAnchor="middle"
              fontSize={16}
              fill="#e5e7eb"
            >
              <tspan>{n.displayName}</tspan>
              <tspan dx="10" fontSize={15} fill="#cbd5e1">
                {rank}/{n.maxRank}
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
