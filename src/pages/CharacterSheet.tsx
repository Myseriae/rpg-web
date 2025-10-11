import type {Character} from "../features/charactersheet/datastructures/character"
import Inventory from "../features/charactersheet/components/Inventory"

export default function CharacterSheet({ strength, dexterity, constitution, intelligence, wisdom, charisma, inventory, equipment }: Character) {
  console.log({ strength, dexterity, constitution, intelligence, wisdom, charisma, inventory, equipment });
  return (
    <Inventory {...inventory} />
  );
}