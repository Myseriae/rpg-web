import type { NodeId } from "../features/skilltree/types";
import { TREE } from "../features/skilltree/data";
import SkillTreeCanvas from "../features/skilltree/components/SkillTreeCanvas";
import { useState, useMemo } from "react";

export default function SkillTree() {
  const [unlockedNodes, setUnlockedNodes] = useState<Set<NodeId>>(
    new Set(["1"]),
  );
  const [points, setPoints] = useState(5);

  const byId = useMemo(() => new Map(TREE.nodes.map((n) => [n.id, n])), []);

  const totalCost = useMemo(() => 
    TREE.nodes
      .filter((n) => unlockedNodes.has(n.id) && n.cost > 0)
      .reduce((sum, n) => sum + n.cost, 0),
      [unlockedNodes]
  );

  const pointsLeft = points - totalCost;

  const isAdjacent = (n: NodeId) => {
    const node = byId.get(n);
    if (!node) return false;
    return node.links.some((linkId) => unlockedNodes.has(linkId));
  }

  const canUnlock = (n: NodeId) => {
    const node = byId.get(n);
    if (!node) return false;
    if (unlockedNodes.has(n)) return true;
    if (node.cost < pointsLeft && isAdjacent(n)) return true;
    return false;
  }

  function onNodeClick(id: NodeId) {
    if (id === "1") return; // cannot toggle start node
    const next = new Set(unlockedNodes);
    if (next.has(id)) {
      if (id !== "1") next.delete(id);
    } else if (canUnlock(id)) next.add(id);
    setUnlockedNodes(next);
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Skill Tree</h1>
      <SkillTreeCanvas tree={TREE} unlockedNodes={unlockedNodes} canUnlock={canUnlock} onNodeClick={onNodeClick} />
    </section>
  );
}
