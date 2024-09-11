import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navbarItems = ["Home", "Page1", "Page2"];
  return (
    <div className="bg-slate-800 w-full flex justify-between p-2 items-center">
      <div>
        <button className="text-white px-2 py-2 rounded-md hover:bg-slate-700">StudyQuest</button>
      </div>
      <div className="flex justify-around items-center w-1/5">
        {navbarItems.map((data,index) => (
          <Link href={"/"} key={index} className="text-white uppercase text-sm">{data}</Link>
        ))}
      </div>
      <div>
        <div className="bg-gray-900 rounded-full w-12 h-12"></div>
      </div>
    </div>
  );
};

export default Navbar;
