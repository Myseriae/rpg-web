export type Element =
  | "Fire"
  | "Frost"
  | "Lightning"
  | "Arcane"
  | "Shadow"
  | "Holy"
  | "Nature"
  | "None";

export type Spell = {
  id: string;
  name: string;
  level: number; // 0–9 works great; 0 can be cantrips
  element: Element;
  manaCost: number;
  castingTime: "Instant" | "Action" | "Bonus Action" | "Reaction" | "Ritual";
  range: string; // "Self", "Touch", "30 ft", "Line 60 ft", etc.
  duration: string; // "Instant", "1 min", "Concentration up to 10 min"
  tags: string[]; // e.g. ["damage","aoe","control"]
  description: string;
};
