
import React, { useState } from "react";
const InfoText = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className="flex space-x-2">
      <h1>{name}:</h1>
      <h2>{value}</h2>
    </div>
  );
};
const Subject = () => {
  const [text, setText] = useState<string>("Subject Name");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div className="w-64 h-18 bg-white rounded-md px-2 py-4">
      <div className="text-center">
        {isEdit ? (
          <input value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <h1>{text}</h1>
        )}
      </div>
      <div>
        <InfoText name="Pending" value={1} />
        <InfoText name="Completed" value={12} />
      </div>
    </div>
  );
};

export default Subject;
