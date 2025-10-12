import type { SkillTree, SkillNode, NodeId } from "../types";

type Props = {
  tree: SkillTree;
  unlockedNodes: Set<NodeId>;
  canUnlock: (n: NodeId) => boolean;
  onNodeClick: (id: NodeId) => void;
};

export default function SkillTreeCanvas({
  tree,
  unlockedNodes,
  canUnlock,
  onNodeClick,
}: Props) {
  const byId = new Map(tree.nodes.map((n) => [n.id, n]));

  const radius = (kind: SkillNode["kind"]) =>
    kind === "start" ? 15 : kind === "keystone" ? 20 : 10;

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="w-full h-[600px] bg-zinc-950 rounded-xl border border-zinc-800"
    >
      {tree.nodes.map((a) =>
        a.links
          .filter((bid) => a.id < bid) // draw once
          .map((bid) => {
            const b = byId.get(bid)!;
            return (
              <line
                key={`${a.id}-${b.id}`}
                x1={a.pos.x}
                y1={a.pos.y}
                x2={b.pos.x}
                y2={b.pos.y}
                stroke="#d1b225ff"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          }),
      )}
      {tree.nodes.map((n) => {
        const r = radius(n.kind);

        const isStart = n.kind === "start";
        const isOn = unlockedNodes.has(n.id);

        // Only show “unlockable” state for nodes that are NOT start and NOT already on
        const canOn = !isStart && !isOn && canUnlock(n.id);

        const fill = isStart ? "#22c55e" : isOn ? "#eab308ff" : "#57534e";
        const stroke = canOn ? "#a3a3a3" : "#0a0a0a";
        const cursor = canOn ? "pointer" : "default";

        const handleClick = () => {
          if (!isStart) onNodeClick(n.id); // start cannot be clicked
        };

        return (
          <g key={n.id}>
            <circle
              cx={n.pos.x}
              cy={n.pos.y}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
              style={{ cursor }}
              onClick={handleClick}
            />
            <text
              x={n.pos.x}
              y={n.pos.y - (r + 8)}
              textAnchor="middle"
              fontSize={12}
              fill="#d4d4d8"
            >
              {n.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
