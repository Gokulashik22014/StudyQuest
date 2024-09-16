"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
const AISummarize = ({ subjectId }: any) => {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(subjectId)
    getAllData();
    // console.log(data)
  }, [subjectId]);
  const handleClick=async()=>{
    const response = await axios.post(
      `http://localhost:3000/api/ai`,{subId:subjectId,question}
    );
  }
  const getAllData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ai?subId=${subjectId}`
      );
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-full p-3 justify-between">
      <div>
        <h1 className="bg-white text-black w-full">
          Summarize your content here
        </h1>
        {/* the place where the summarized content is displayed */}
      </div>
      <div className="bg-slate-400 overflow-scroll custom-scrollbar">
        {data && data.map((val: any) => <div>
          <h1 className="bg-zinc-700 text-white mt-3">{val.question}</h1>
          <h2 className="bg-zinc-300 text-black mt-3">{val.answer}</h2>
        </div>)}
      </div>
      {/* input place */}
      <div className="flex space-x-3">
        <div className="bg-white w-2/3 rounded-lg px-1 py-2 ">
          <input
            type="text"
            name=""
            id=""
            placeholder={"Paste your content here..."}
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            className="w-full h-hull rounded-lg outline-none text-black"
          />
        </div>
        <button className="bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-lg ease-in-out duration-300" onClick={handleClick}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default AISummarize;
