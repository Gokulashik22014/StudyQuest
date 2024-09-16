import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
type CardsType = {
  _id: string;
  name: string;
  cards: string[];
  createdAt?: string;
  updatedAt?: string;
  handleOnClick: any;
  subjectId: any;
};

const InfoText = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className="flex space-x-2">
      <h1>{name}:</h1>
      <h2>{value}</h2>
    </div>
  );
};
const Subject = ({ name, cards, _id, handleOnClick, subjectId }: CardsType) => {
  const [text, setText] = useState<string>(name);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  let color = hover || isEdit ? "bg-zinc-300" : "bg-white";
  color = _id == subjectId ? "bg-green-300" : color;
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/subjects/${_id}`,
        { name: text }
      );
      if (response.data.success) {
        alert("Successfully updated");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };
  return (
    <div
      className={`flex flex-col justify-between w-64 h-12 ${color} rounded-md px-2 py-4`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClick}
    >
      <div className="text-center">
        {isEdit ? (
          <div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="outline-none border border-solid border-black rounded-md px-2 py-1"
            />
            <button
              className="bg-lime-400 rounded-md px-2 py-1 ml-2"
              onClick={handleEdit}
            >
              <TiTick />
            </button>
          </div>
        ) : (
          <h1>{text}</h1>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        {isEdit && (
          <button
            className="bg-red-400 rounded-md px-2 py-1"
            onClick={() => setIsEdit(false)}
          >
            <MdCancel />
          </button>
        )}
        {(hover || isEdit) && (
          <button
            className="bg-slate-400 rounded-md px-2 py-1 duration-100 ease-in-out"
            onClick={() => setIsEdit(true)}
          >
            <FaRegEdit />
          </button>
        )}
      </div>
    </div>
  );
};

export default Subject;
