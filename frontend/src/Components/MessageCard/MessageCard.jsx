import React from 'react';

const MessageCard = ({ isReqUserMessage, content, timestamp, profilePic }) => {
  return (
    <div className={`flex w-full ${isReqUserMessage ? 'justify-start' : 'justify-end'} my-2`}>
      {!isReqUserMessage && profilePic && (
        <img src={profilePic} alt="profile" className="w-8 h-8 rounded-full mr-2" />
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isReqUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <p>{content}</p>
        {timestamp && (
          <span className="text-xs text-gray-600 mt-1">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
