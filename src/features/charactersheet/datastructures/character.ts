import type { Item } from "./item";

type Inventory = {
    size: number;
    items: Item[];
};

export type Character = {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    // Add more character attributes as needed
    // e.g., skills, inventory, spells, etc.
    inventory?: Inventory;
    equipment?: Item[];
};