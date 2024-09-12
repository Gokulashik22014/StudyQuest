import React from "react";
import { IoSend } from "react-icons/io5";
const AISummarize = () => {
  return (
    <div className="flex flex-col h-full p-3 justify-between">
      <div>
        <h1>Summarize your content here</h1>
        {/* the place where the summarized content is displayed */}
        <div className="bg-slate-400"></div>
      </div>
      {/* input place */}
      <div className="flex space-x-3">
        <div className="bg-white w-2/3 rounded-lg px-1 py-2 ">
          <input
            type="text"
            name=""
            id=""
            placeholder={"Paste your content here..."}
            className="w-full h-hull rounded-lg outline-none"
          />
        </div>
        <button className="bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-lg ease-in-out duration-300">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default AISummarize;
