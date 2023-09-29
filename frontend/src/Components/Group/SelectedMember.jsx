import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full p-1">
      <img
        className="w-7 h-7 rounded-full"
        src={
          member.profile ||
          "https://cdn.pixabay.com/photo/2023/09/04/06/59/dog-8232158_1280.jpg"
        }
        alt=""
      />
      <p className="px-2 text-white">{member.name}</p>
      <AiOutlineClose
        onClick={() => handleRemoveMember(member)}
        className="cursor-pointer text-white"
      />
    </div>
  );
};

export default SelectedMember;
