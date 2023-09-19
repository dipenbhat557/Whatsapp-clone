import { Avatar, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";

const NewGroup = ({ groupMember, setIsGroup }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupImage, setGroupImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleCreateGroup = () => {
    let userIds = [];

    for (let user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds,
      chatName: groupName,
      chatImage: groupImage,
    };
    const data = {
      group,
      token,
    };
    dispatch(createGroupChat(data));
    setIsGroup(false);
  };

  const uploadToCloudinary = (pics) => {
    setIsImageUploading(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "dadlxgune");
    fetch("https://api.cloudinary.com/v1_1/dadlxgune/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      });
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
        <p className="text-xl font-semibold">New Group</p>
      </div>
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput" className="relative">
          <Avatar
            alt="Remy Sharp"
            sx={{ width: "15rem", height: "15rem" }}
            src={
              groupImage ||
              "https://media.istockphoto.com/id/1455296779/photo/smiling-businesspeople-standing-arm-in-arm-in-an-office-hall.webp?b=1&s=170667a&w=0&k=20&c=0bdu3-mVcOw6FN_vIkwTx4pCE6jgL7Jy29bBWZhoiik="
            }
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
        />
      </div>
      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          placeholder="Group Subject"
          value={groupName || ""}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      {groupName && (
        <div className="py-10 bg-slate-200 flex items-center justify-center">
          <Button onClick={handleCreateGroup}>
            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2 className="text-white text-3xl font-bold" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
export default NewGroup;
