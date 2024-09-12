"use client";
import React, { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import ToDoCards from "./ToDoCards";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Editor = () => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }
    setUsers((user) => {
      const original = user.findIndex((item) => item.id === active.id);
      const replace = user.findIndex((item) => item.id === over?.id);
      return arrayMove(user, original, replace);
    });
  };
  const [users, setUsers] = useState([
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
    { id: 4, name: "four" },
  ]);
  return (
    <div className="bg-black h-[300px] p-4 flex space-x-1">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-slate-400">
          <SortableContext items={users} strategy={verticalListSortingStrategy}>
            {users.map((data) => (
              <ToDoCards data={data} key={data.id} />
            ))}
          </SortableContext>
        </div>
        <div className="bg-slate-400"></div>
        <div className="bg-slate-400"></div>
      </DndContext>
    </div>
  );
};

export default Editor;
