import React from "react";
// import Editor from "./components/Editor";
import Subjects from "./components/Subjects";
const Home = () => {
  return (
    <div className="mx-auto w-[90%] px-2">
      {/* add the subjects column */}
      <div className="py-4 h-[300px]">
        <Subjects />
      </div>
      {/* additional info column */}
      <div>
        {/* to list of the subjects */}
        <div>
          {/* <Editor /> */}
        </div>
        {/* Ai chat summarizer section */}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
