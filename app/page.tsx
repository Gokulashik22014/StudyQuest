"use client"
import React, { useEffect, useState } from "react";
// import Editor from "./components/Editor";
import Subjects from "./components/Subjects";
import KanbanBoard from "./components/KanbanBoard";
import AISummarize from "./components/AISummarize";
const Home = () => {
  const [subjectId,setSubjectId]=useState<string|undefined>(undefined)
  useEffect(()=>{
    console.log(subjectId)
  },[subjectId])
  return (
    <div className="mx-auto w-[90%] px-2 max-h-screen">
      {/* add the subjects column */}
      <div className="py-4 h-[300px]">
        <Subjects setSubjectId={setSubjectId} subjectId={subjectId}/>
      </div>
      {/* additional info column */}
      <div className="w-full flex ">
        {/* to list of the subjects */}
        <div className="w-1/2 bg-black rounded-md m-1 h-[320px] text-white">
          <KanbanBoard subjectId={subjectId}/>
        </div>
        {/* Ai chat summarizer section */}
        <div className="w-1/2 bg-black rounded-md m-1 h-[320px] text-white">
          <AISummarize subjectId={subjectId}/>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
