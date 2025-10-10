type Props = {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    // Add more character attributes as needed
    // e.g., skills, inventory, spells, etc.
    inventory?: string[];
};

export default function CharacterSheet({props}: Props) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Character Sheet</h1>
      <p className="text-zinc-400">character sheet content</p>
    </section>
  );
}