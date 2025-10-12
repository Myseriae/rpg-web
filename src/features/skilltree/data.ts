import type { SkillTree, SkillNode, NodeId } from "./types";

const nodes: SkillNode[] = [
  {
    id: "1",
    title: "Origin",
    kind: "start",
    pos: { x: 500, y: 500 },
    links: [],
    cost: 0,
    effect: { charisma: 1 },
  },
  {
    id: "2",
    title: "Stat Boost",
    kind: "stat",
    pos: { x: 600, y: 500 },
    links: [],
    cost: 1,
    effect: { strength: 1 },
  },
  {
    id: "3",
    title: "Stat Boost",
    kind: "stat",
    pos: { x: 600, y: 600 },
    links: [],
    cost: 1,
    effect: { dexterity: 1 },
  },
  {
    id: "4",
    title: "Keystone Ability",
    kind: "keystone",
    pos: { x: 700, y: 550 },
    links: [],
    cost: 3,
    effect: { constitution: 2 },
  },
  {
    id: "5",
    title: "Keystone Ability",
    kind: "keystone",
    pos: { x: 700, y: 650 },
    links: [],
    cost: 3,
    effect: { intelligence: 2 },
  },
];

const byId = new Map<NodeId, SkillNode>(nodes.map((n) => [n.id, n]));

function connect(a: SkillNode, b: SkillNode) {
  if (a.id === b.id) return; // no self-links
  if (!a.links.includes(b.id)) a.links.push(b.id);
  if (!b.links.includes(a.id)) b.links.push(a.id);
}

connect(byId.get("1")!, byId.get("2")!);
connect(byId.get("1")!, byId.get("3")!);
connect(byId.get("2")!, byId.get("4")!);
connect(byId.get("3")!, byId.get("5")!);
connect(byId.get("4")!, byId.get("5")!);

function validateLinks(nodes: SkillNode[]) {
  for (const n of nodes) {
    // No self-links
    if (n.links.includes(n.id)) throw new Error(`Node ${n.id} has a self-link`);
    // No duplicate links
    if (new Set(n.links).size !== n.links.length)
      throw new Error(`Node ${n.id} has duplicate links`);
    // existence + symmetry
    for (const linkId of n.links) {
      const target = byId.get(linkId);
      if (!target)
        throw new Error(`Node ${n.id} links to non-existent node ${linkId}`);
      if (!target.links.includes(n.id))
        throw new Error(`Node ${n.id} links to ${linkId}, but not vice versa`);
    }
  }
}

validateLinks(nodes);

export const TREE: SkillTree = { nodes };
