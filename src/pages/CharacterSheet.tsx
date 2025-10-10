import type {Character} from "../datastructures/character";

export default function CharacterSheet({ strength, dexterity, constitution, intelligence, wisdom, charisma, inventory, equipment }: Character) {
  console.log({ strength, dexterity, constitution, intelligence, wisdom, charisma, inventory, equipment });
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Character Sheet</h1>
      <p className="text-zinc-400">character sheet content</p>
    </section>
  );
}