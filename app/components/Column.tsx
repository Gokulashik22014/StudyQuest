"use client";
import { FC, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";
import axios from "axios";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
  subId?:any;
  fun?:any
};

const Column: FC<ColumnType> = ({ id, title, cards,subId,fun }) => {
  const { setNodeRef } = useDroppable({ id: id });
  const [name, setName] = useState<string>("");
  
  const handleClick = async () => {
    try {
      const response=await axios.post("http://localhost:3000/api/cards",{name:name,status:id})
      if(response.data.success){
        const subResponse=await axios.patch(`http://localhost:3000/api/subjects/${subId}`,{type:true,cardId:response.data.message._id})
        console.log(subResponse.data)
      }
    } catch (error) {
      console.log(error)
    }
    fun()
    setName("");
  };

  return (
    <SortableContext id={id} items={cards ?? []} strategy={rectSortingStrategy}>
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
          {cards && cards.length > 0 ? (
            cards.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} />
            ))
          ) : (
            <div className="text-black ">No cards available</div>
          )}
        </div>
        <div className="flex flex-row justify-between mt-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New card name"
            className="w-full mr-2 px-2 rounded-md border border-gray-300 text-black"
          />
          <button
            className="items-center bg-zinc-600 rounded-md px-2 py-1 hover:bg-zinc-400 hover:text-black ease-in-out duration-200"
            onClick={handleClick}
          >
            + 
          </button>
        </div>
      </div>
    </SortableContext>
  );
};

export default Column;
