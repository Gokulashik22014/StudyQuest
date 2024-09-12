import React from "react";
import Editor from "./components/Editor";
import Subjects from "./components/Subjects";
import KanbanBoard from "./components/KanbanBoard";
const Home = () => {
  return (
    <div className="mx-auto w-[90%] px-2 max-h-screen">
      {/* add the subjects column */}
      <div className="py-4 h-[300px]">
        <Subjects />
      </div>
      {/* additional info column */}
      <div className="w-full">
        {/* to list of the subjects */}
        <div className="w-1/2">
          <KanbanBoard/>
        </div>
        {/* Ai chat summarizer section */}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
