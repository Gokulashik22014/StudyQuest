"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column, { ColumnType } from "./Column";
import { useState } from "react";

export default function KanbanBoard() {
  // Define initial data
  const initialData: ColumnType[] = [
    {
      id: "todo",
      title: "To-Do",
      cards: [
        {
          id: "Card1",
          title: "Card1",
        },
        {
          id: "Card2",
          title: "Card2",
        },
      ],
    },
    {
      id: "doing",
      title: "Doing",
      cards: [
        {
          id: "Card3",
          title: "Card3",
        },
        {
          id: "Card4",
          title: "Card4",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: "Card5",
          title: "Card5",
        },
        {
          id: "Card6",
          title: "Card6",
        },
      ],
    },
  ];
  const [columns, setColumns] = useState<ColumnType[]>(initialData);

  const findColumn = (id: string | null): ColumnType | null => {
    if (!id) return null;
    return (
      columns.find(
        (column) =>
          column.id === id || column.cards.some((card) => card.id === id)
      ) || null
    );
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = active.id.toString();
    const overId = over ? over.id.toString() : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    setColumns((prevColumns) => {
      const activeCardIndex = activeColumn.cards.findIndex(
        (card) => card.id === activeId
      );
      const activeCard = activeColumn.cards[activeCardIndex];

      const newColumns = prevColumns.map((column) => {
        if (column.id === activeColumn.id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== activeId),
          };
        }
        if (column.id === overColumn.id) {
          const overCardIndex = column.cards.findIndex(
            (card) => card.id === overId
          );
          const insertIndex =
            overCardIndex >= 0 ? overCardIndex : column.cards.length;

          return {
            ...column,
            cards: [
              ...column.cards.slice(0, insertIndex),
              activeCard,
              ...column.cards.slice(insertIndex),
            ],
          };
        }
        return column;
      });

      return newColumns;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over ? over.id.toString() : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return;
    }

    const activeIndex = activeColumn.cards.findIndex(
      (card) => card.id === activeId
    );
    const overIndex = overColumn.cards.findIndex((card) => card.id === overId);

    if (activeIndex !== overIndex) {
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column.id === activeColumn.id) {
            const newCards = arrayMove(column.cards, activeIndex, overIndex);
            return { ...column, cards: newCards };
          }
          return column;
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="KanbanBoard"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          />
        ))}
      </div>
    </DndContext>
  );
}
