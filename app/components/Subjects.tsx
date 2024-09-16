"use client";
import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import axios from "axios"
import { IoIosAddCircleOutline } from "react-icons/io";
type CardsType={
  _id:string;
  name:string;
  cards:string[];
  createdAt:string;
  updatedAt:string;
}

const Subjects = ({setSubjectId,subjectId}:{setSubjectId:any,subjectId:any}) => {
  const [data,setData]=useState<CardsType[]|undefined>(undefined)
  const [name,setName]=useState<string| undefined>(undefined)
  useEffect(()=>{
    getSubjects()
  },[])
  const handleAdd=async()=>{
    try {
      await axios.post("http://localhost:3000/api/subjects/",{name:name})
    } catch (error) {
      console.log(error)
    }
    getSubjects()
  }
  const getSubjects=async()=>{
    try {
      await axios.get("http://localhost:3000/api/subjects/").then((response)=>{
        console.log(response.data.message)
        setData(response.data.message)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-slate-500 grid grid-flow-row grid-cols-4 gap-4 p-10 h-full overflow-scroll custom-scrollbar">
      {
        data?.map((subject)=><Subject name={subject.name} cards={subject.cards} _id={subject._id} handleOnClick={()=>setSubjectId(subject._id)} subjectId={subjectId}/>)
      }
      <div className="flex-col w-64 h-18 bg-white/50 rounded-md border border-dashed border-black items-center flex justify-center">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="rounded-md outline-none px-1 py-1"/>
        <button className="h-18 text-5xl text-white bg-zinc-400 px-6 rounded-lg mt-2" onClick={handleAdd}><IoIosAddCircleOutline/></button>
      </div>
    </div>
  );
};

export default Subjects;
