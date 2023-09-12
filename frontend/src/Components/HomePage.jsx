import React from "react";
import { BiCommentDetail } from "react-icons/bi"; // Use the correct icon set
import { TbCircleDashed } from "react-icons/tb"; // Use the correct icon set
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";

function HomePage() {
  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884] w-full"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-6 left-6 w-full">
        <div className="left w-[30%] h-full bg-[#e8e9ec]">
          <div className="w-full">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center space-x-3">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2023/05/25/07/31/woman-8016553_640.jpg"
                  alt="profile"
                />
                <p>username</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed />
                <BiCommentDetail />
              </div>
            </div>

            <div className="relative flex justify-center items-center bg-white py-4 px-3">
              <input
                className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-3"
                type="text"
                placeholder="Search or Start new chat"
              />
              <AiOutlineSearch className="left-5 top-8 absolute" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default HomePage;
