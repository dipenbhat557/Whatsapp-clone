import { Avatar, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";

const NewGroup = ({ groupMember, setIsGroup }) => {
  // State to manage image uploading
  const [isImageUploading, setIsImageUploading] = useState(false);
  // State to store the group image
  const [groupImage, setGroupImage] = useState(null);
  // State to store the group name
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  // Get the user's token from local storage
  const token = localStorage.getItem("token");

  // Function to handle the creation of a new group
  const handleCreateGroup = () => {
    // Extract user IDs from group members
    let userIds = [];
    for (let user of groupMember) {
      userIds.push(user.id);
    }
    // Create a group object with user IDs, group name, and group image
    const group = {
      userIds,
      chatName: groupName,
      chatImage: groupImage,
    };
    // Create data object with group and token
    const data = {
      group,
      token,
    };
    // Dispatch an action to create a group chat
    dispatch(createGroupChat(data));
    // Close the new group creation interface
    setIsGroup(false);
  };

  // Function to upload an image to Cloudinary
  const uploadToCloudinary = (pics) => {
    // Set the image uploading flag to true
    setIsImageUploading(true);
    // Create a new FormData object and append the selected file to it
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "dadlxgune");
    // Make a POST request to Cloudinary's API to upload the image
    fetch("https://api.cloudinary.com/v1_1/dadlxgune/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // Set the group image URL and update the image uploading flag
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      });
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
        <p className="text-xl font-semibold">New Group</p>
      </div>

      {/* Group image */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput" className="relative">
          <Avatar
            alt="Group Image"
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

      {/* Group name input */}
      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          placeholder="Group Subject"
          value={groupName || ""}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      {/* Create group button */}
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
