import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type User = {
  id: number;
  name: string;
};

type Props = {
  data: User;
};

const ToDoCards = ({ data }: Props) => {
  const { listeners, transform, transition, attributes, setNodeRef } =
    useSortable({ id: data.id });

  // Style for dragging effect
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white mb-3 p-4 rounded-lg shadow-md flex justify-between items-center space-x-4 hover:shadow-lg hover:bg-gray-100 transition-all"
    >
      <div className="font-semibold text-lg text-gray-700">ToDo</div>
      <div className="text-gray-500">{data.name}</div>
    </div>
  );
};

export default ToDoCards;
