import type { Item } from "./item";

export type Inventory = {
    capacity: number;
    items: Item[];
    size: number;
};

type Equipment = {
    head?: Item;
    body?: Item;
    legs?: Item;
    feet?: Item;
    hands?: Item;
    weaponMainHand?: Item;
    weaponOffHand?: Item;
    // Add more equipment slots as needed
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
    inventory: Inventory;
    equipment: Equipment;
};