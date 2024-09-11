"use client";
import React from "react";
import Subject from "./Subject";

const Subjects = () => {
  return (
    <div className="bg-slate-500 grid grid-flow-row grid-cols-4 gap-4 p-10 h-full overflow-scroll custom-scrollbar">
      {
        Array.from({length:6},(_,index)=><Subject key={index}/>)
      }
      <div className="w-64 h-18 bg-white/50 rounded-md border border-dashed border-black items-center flex justify-center">
        <button className="h-18">Add</button>
      </div>
    </div>
  );
};

export default Subjects;
