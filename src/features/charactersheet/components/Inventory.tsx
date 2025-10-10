import type { Item } from "../datastructures/item";

type InventoryProps = { inventory?: Item[] };

export default function Inventory({ inventory = [] }: InventoryProps) {
  console.log(inventory);
  return (
    <>
      <h2>Inventory</h2>
      <div className="grid grid-cols-10 gap-4">
        {inventory.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="border border-zinc-800 rounded p-4 flex flex-col items-center"
            >
              <Icon className="w-3/4 h-3/4 text-gray-700" />
            </div>
          );
        })}
      </div>
    </>
  );
}
