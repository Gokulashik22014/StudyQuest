import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const Column: FC<ColumnType> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245,247,249,1.00)",
          marginRight: "10px",
        }}
        className="h-full rounded-lg p-2 flex flex-col"
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
          }}
        >
          {title}
        </p>
        <div className="flex-grow flex flex-col space-y-2">
          {cards.map((card) => (
            <Card key={card.id} id={card.id} title={card.title}></Card>
          ))}
        </div>
        <div className="flex flex-row justify-end">
          <button className="items-center bg-zinc-600 rounded-md px-3 py-2 hover:bg-zinc-400 hover:text-black ease-in-out duration-200">
            + Add
          </button>
        </div>
      </div>
    </SortableContext>
  );
};

export default Column;
