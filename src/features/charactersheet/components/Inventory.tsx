import type { Inventory as InventoryType } from "../datastructures/character";
import { useEffect, useRef } from "react";

import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function Item({ icon: Icon }: ItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "DraggableType",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);

  // Connect drag ref manually
  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref, drag]);

  return (
    <div
      ref={ref}
      className="border border-zinc-800 rounded aspect-square flex items-center justify-center bg-zinc-900"
      style={{
        width: "100px",
        height: "100px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <Icon className="w-12 h-12 text-zinc-400" />
    </div>
  );
}

export default function Inventory({ size, items, capacity }: InventoryType) {
  return (
    <>
      <h2>Inventory</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-10 gap-4 relative">
          {items.map((item) => {
            const Icon = item.icon;
            return <Item icon={Icon} />;
          })}
          {/* Empty Slots */}
          {Array.from({ length: capacity - size }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="border border-zinc-800 rounded aspect-square flex items-center justify-center opacity-20"
              style={{
                width: "100px",
                height: "100px",
                left: ((index + size) % 10) * 108 + "px",
                top: Math.floor((index + size) / 10) * 108 + "px",
                position: "absolute",
              }}
            ></div>
          ))}
        </div>
      </DndProvider>
      <i>
        {size}/{capacity}
      </i>
    </>
  );
}
