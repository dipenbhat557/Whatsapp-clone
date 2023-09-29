import React from "react";

const ChatCard = ({ userImg, name, lastMessage }) => {
  // Function to format a timestamp to a readable date
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[19%]">
        <img className="h-13 w-14 rounded-full" src={userImg} alt="profile" />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">{name}</p>
          <p className="text-sm">
            {lastMessage ? formatTimestamp(lastMessage.timestamp) : ""}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 truncate">
            {lastMessage ? lastMessage.content : ""}
          </p>
          <div className="flex space-x-2">
            <span className="text-gray-500 text-xs">3h</span>
            <span className="bg-green-500 h-2 w-2 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
