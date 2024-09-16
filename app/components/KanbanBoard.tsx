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
import { useEffect, useState } from "react";
import axios from "axios";

export default function KanbanBoard({ subjectId }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCards();
  }, [subjectId]);

  const handleCardStatusChange=async(cardId:any,status:string)=>{
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cards/${cardId}`,{status}
      );
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCards = async () => {
    if (!subjectId) {
      console.log("create a subject first");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/subjects/${subjectId}`
      );
      const cards = response.data.result;
      setData(cards);
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.log(error);
    }
  };

  const initialData: ColumnType[] = [
    {
      id: "todo",
      title: "To-Do",
      cards: data
        ? data.filter((val: any) => val.status === "todo").map((val: any) => ({
            id: val._id,
            title: val.name,
          }))
        : [],
    },
    {
      id: "doing",
      title: "Doing",
      cards: data
        ? data.filter((val: any) => val.status === "doing").map((val: any) => ({
            id: val._id,
            title: val.name,
          }))
        : [],
    },
    {
      id: "done",
      title: "Done",
      cards: data
        ? data.filter((val: any) => val.status === "done").map((val: any) => ({
            id: val._id,
            title: val.name,
          }))
        : [],
    },
  ];

  const [columns, setColumns] = useState<ColumnType[]>(initialData);

  useEffect(() => {
    if (data) {
      const updatedColumns = [
        {
          id: "todo",
          title: "To-Do",
          cards: data
            ? data.filter((val: any) => val.status === "todo").map((val: any) => ({
                id: val._id,
                title: val.name,
              }))
            : [],
        },
        {
          id: "doing",
          title: "Doing",
          cards: data
            ? data.filter((val: any) => val.status === "doing").map((val: any) => ({
                id: val._id,
                title: val.name,
              }))
            : [],
        },
        {
          id: "done",
          title: "Done",
          cards: data
            ? data.filter((val: any) => val.status === "done").map((val: any) => ({
                id: val._id,
                title: val.name,
              }))
            : [],
        },
      ];
      setColumns(updatedColumns);
    }
  }, [data]);

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
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over ? over.id.toString() : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    // console.log(overColumn)
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
    // console.log(overColumn)
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return;
    }
    // console.log(overColumn)

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
    handleCardStatusChange(active.id,overColumn.id)
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Return null or loading state if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="KanbanBoard h-full"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            subId={subjectId}
            fun={getCards}
          />
        ))}
      </div>
    </DndContext>
  );
}
