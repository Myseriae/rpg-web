export type NodeId = string;

type SkillKind = "start" | "stat" | "keystone";

export type SkillNode = {
  id: NodeId;
  title: string;
  kind: SkillKind;
  pos: { x: number; y: number };
  links: NodeId[];
  cost: number; // Skill points required to unlock
  effect?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
};

export type SkillTree = {
  nodes: SkillNode[];
};