const MessageCard = ({ isReqUserMessage, content }) => {
  return (
    <div
      className={`py-2 px-2 wounded-md max-w-[50%] ${
        isReqUserMessage ? "self-start bg-white " : "self-end bg-[#d9fdd3]"
      }`}
    >
      <p>{content}</p>
    </div>
  );
};
export default MessageCard;
