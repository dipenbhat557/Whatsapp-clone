import React from 'react';
import ChatCard from '../ChatCard/ChatCard';

const ChatList = ({
  querys,
  auth,
  chat,
  lastMessages,
  handleClickOnChatCard,
  handleCurrentChat,
}) => {
  return (
    <div className="bg-white overflow-y-scroll h-[73vh] px-3">
      {querys &&
        auth.searchUser?.map((item, index) => (
          <div key={index} onClick={() => handleClickOnChatCard(item.id)}>
            <hr />
            <ChatCard
              name={item.name}
              userImg={
                item.profile ||
                "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
              }
              lastMessage={{
                content:
                  lastMessages[item.id]?.content || "Start your conversation",
                timestamp: lastMessages[item.id]?.timestamp || "",
              }}
            />
          </div>
        ))}
      {chat?.chats?.length > 0 &&
        !querys &&
        chat?.chats?.map((item, index) => (
          <div key={index} onClick={() => {
            handleCurrentChat(item)
            console.log("the item is ",item)
          }}>
            <hr />
            <ChatCard
              isChat={!item.group}
              name={item.group ? item.chatName : auth.reqUser?.id !== item.users[0]?.id ? item.users[0]?.name : item.users[1]?.name}
              userImg={
                item.chatImage ||
                "https://media.istockphoto.com/id/1455296779/photo/smiling-businesspeople-standing-arm-in-arm-in-an-office-hall.webp?b=1&s=170667a&w=0&k=20&c=0bdu3-mVcOw6FN_vIkwTx4pCE6jgL7Jy29bBWZhoiik="
              }
              lastMessage={{
                content:
                  lastMessages[item.id]?.content || "Start your conversation",
                timestamp: lastMessages[item.id]?.timestamp || "",
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default ChatList;
