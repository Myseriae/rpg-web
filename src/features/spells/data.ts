import type { Spell } from "./types.ts";

export const SPELLS: Spell[] = [
  {
    id: "harcialdozat",
    name: "Harci Áldozat",
    level: 0,
    element: "Holy",
    manaCost: 5,
    castingTime: "2 + FullAction",
    range: "Self",
    duration: "2 Turns",
    tags: ["buff", "self"],
    description:
      "Harcképtelenné válsz, ellenállásod nő, mindenki rád aggrozik X mezőn belül.",
  },
  {
    id: "kockavetes",
    name: "Kockavetés",
    level: 0,
    element: "Arcane",
    manaCost: 3,
    castingTime: "1 + Action",
    range: "6 Tiles",
    duration: "Instant",
    tags: ["utility", "ranged"],
    description:
      "D6-val dobsz. 1-3: semmi, 4: 1d6 sebzés, 5: 2d6 sebzés, 6: Crit! (3d6 sebzés).",
  },
  // ...more spells...
];
