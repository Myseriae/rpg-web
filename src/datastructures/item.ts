export type Item = {
    id: string;
    name: string;
    description?: string;
    weight?: number;
    value?: number;
    damage?: string; // e.g., "1d6"
    armorClass?: number; // e.g., 15
    type?: string; // e.g., "weapon", "armor", "potion"
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    // Add more item properties as needed
};