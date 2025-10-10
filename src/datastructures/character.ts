import type { Item } from "./item";

export type Character = {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    // Add more character attributes as needed
    // e.g., skills, inventory, spells, etc.
    inventory?: Item[];
    equipment?: Item[];
};