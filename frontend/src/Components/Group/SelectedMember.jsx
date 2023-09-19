import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 rounded-full h-7 "
        src={
          member.profile ||
          "https://cdn.pixabay.com/photo/2023/09/04/06/59/dog-8232158_1280.jpg"
        }
        alt=""
      />
      <p className="px-2">{member.name}</p>
      <AiOutlineClose
        onClick={() => handleRemoveMember(member)}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};
export default SelectedMember;
