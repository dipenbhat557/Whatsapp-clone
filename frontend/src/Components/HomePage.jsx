import React, { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi"; // Use the correct icon set
import { TbCircleDashed } from "react-icons/tb"; // Use the correct icon set
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../Redux/Message/Action";
import SockJs from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

function HomePage() {
  const [querys, setQuerys] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [stompClient, setStompClient] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const sock = new SockJs("http://localhost:8080/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };
    temp.connect(headers, onConnect, onError);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onError = (error) => {
    console.log("on error ", error);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage]);
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage]);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);

  const onMessageRecieve = (payload) => {
    console.log("reciever message ", JSON.parse(payload.body));

    const recievedMessage = JSON.parse(payload.body);
    setMessages([...messages, recievedMessage]);
  };

  useEffect(() => {
    if (isConnected && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group" + currentChat.id.toString(),
        onMessageRecieve
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    connect();
  }, []);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(true);
    console.log("inside handle click on chat card");
    dispatch(createChat({ token, data: { userId } }));
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };

  const handleCreateNewMessage = () => {
    console.log("content from method ", content);
    console.log("from method ", currentChat.id);
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };

  useEffect(() => {
    console.log("after setting this is inside use effect");
    if (currentChat?.id)
      dispatch(getAllMessages({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage]);

  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createdChat, chat.createdGroup]);

  const handleNavigate = () => {
    // navigate("/profile");
    setIsProfile(true);
  };

  const handleCloseOpenProfile = () => {
    console.log("i am working");
    setIsProfile(false);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    console.log("inside logout handler");
    navigate("/signin");
  };

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signin");
    }
  }, [auth.reqUser]);

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  const handleCurrentChat = (item) => {
    console.log(item);
    console.log("inside handle current chat");
    setCurrentChat(item);
    console.log("current item is ", currentChat);
    console.log("setting is done");
  };

  return (
    <div className="relative">
      <div className="w-[100vw] py-14 bg-[#00a884]">
        <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]">
          <div className="left w-[30%] h-full bg-[#e8e9ec]">
            {/* profile */}
            {isProfile && (
              <div className="w-full h-full">
                <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
              </div>
            )}
            {/* group */}
            {isGroup && <CreateGroup setIsGroup={setIsGroup} />}

            {/* home */}
            {!isProfile && !isGroup && (
              <div className="w-full">
                <div className="flex justify-between items-center p-3">
                  <div
                    onClick={handleNavigate}
                    className="flex items-center space-x-3"
                  >
                    <img
                      className="rounded-full w-10 h-10 cursor-pointer"
                      src={
                        auth.reqUser?.profile ||
                        "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                      }
                      alt="profile"
                    />
                    <p>{auth.reqUser?.name}</p>
                  </div>
                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed
                      className="cursor-pointer"
                      onClick={() => navigate("/status")}
                    />
                    <BiCommentDetail />
                    <div>
                      <BsThreeDotsVertical
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      />
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleNavigate}>Profile</MenuItem>
                        <MenuItem onClick={handleCreateGroup}>
                          Create Group
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center items-center bg-white py-4 px-3">
                  <input
                    className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-3"
                    type="text"
                    placeholder="Search or Start new chat"
                    onChange={(e) => {
                      setQuerys(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    value={querys}
                  />
                  <AiOutlineSearch className="left-5 top-8 absolute" />
                  <div>
                    <BsFilter className="ml-4 text-3xl" />
                  </div>
                </div>
                {/*all user */}
                <div className="bg-white overflow-y-scroll h-[73vh] px-3">
                  {querys &&
                    auth.searchUser?.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleClickOnChatCard(item.id)}
                      >
                        <hr />
                        <ChatCard
                          name={item.name}
                          userImg={
                            item.profile ||
                            "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                          }
                        />
                      </div>
                    ))}

                  {chat.chats?.length > 0 &&
                    !querys &&
                    chat.chats?.map((item, index) => (
                      <div key={index} onClick={() => handleCurrentChat(item)}>
                        <hr />
                        {item.group ? (
                          <ChatCard
                            name={item.chatName}
                            userImg={
                              item.chatImage ||
                              "https://media.istockphoto.com/id/1455296779/photo/smiling-businesspeople-standing-arm-in-arm-in-an-office-hall.webp?b=1&s=170667a&w=0&k=20&c=0bdu3-mVcOw6FN_vIkwTx4pCE6jgL7Jy29bBWZhoiik="
                            }
                          />
                        ) : (
                          <ChatCard
                            isChat={true}
                            name={
                              auth.reqUser?.id !== item.users[0]?.id
                                ? item.users[0].name
                                : item.users[1].name
                            }
                            userImg={
                              auth.reqUser?.id !== item.users[0]?.id
                                ? item.users[0].profile ||
                                  "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                                : item.users[1].profile ||
                                  "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                            }
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* default whatsapp page */}
          {currentChat?.id || (
            <div className="w-[70%] flex flex-col items-center justify-center h-full">
              <div className="max-w-[70%] text-center">
                <img
                  className="ml-11 lg:w-[75%] "
                  src="https://cdn.pixabay.com/photo/2015/08/03/13/58/whatsapp-873316_640.png"
                  alt="whatsapp-icon"
                />
                <h1 className="text-4xl text-gray-600">WhatsApp Web</h1>
                <p className="my-9">
                  Send and recieve message with whatsapp and save time
                </p>
              </div>
            </div>
          )}

          {/* messasge part */}
          {currentChat?.id && (
            <div className="w-[70%] relative  bg-blue-200">
              <div className="header absolute top-0 w-full bg-[#f0f2f5]">
                <div className="flex justify-between">
                  <div className="py-3 space-x-4 flex items-center px-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        currentChat.is_group
                          ? currentChat.chat_image ||
                            "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                          : auth.reqUser?.id !== currentChat.users[0]?.id
                          ? currentChat.users[0]?.profile ||
                            "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                          : currentChat.users[1]?.profile ||
                            "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
                      }
                      alt="profile"
                    />

                    <p>
                      {currentChat.is_group
                        ? currentChat.chat_name
                        : auth.reqUser?.id !== currentChat.users[0]?.id
                        ? currentChat.users[0].name
                        : currentChat.users[1].name}
                    </p>
                  </div>
                  <div className="flex py-3 space-x-4 items-center px-3">
                    <AiOutlineSearch />
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>

              {/* message section */}
              <div className="px-10 h-[85vh] overflow-y-scroll">
                <div className="space-y-1 flex flex-col justify-center border mt-20 py-2">
                  {messages?.length > 0 &&
                    messages?.map((item, i) => (
                      <MessageCard
                        key={i}
                        isReqUserMessage={item.user.id !== auth.reqUser.id}
                        content={item.content}
                      />
                    ))}
                </div>
              </div>
              {/* footer part */}

              <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
                <div className="flex justify-between items-center px-5 relative">
                  <BsEmojiSmile className="cursor-pointer" />
                  <ImAttachment />

                  <input
                    className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type message"
                    value={content}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCreateNewMessage();
                        setContent("");
                      }
                    }}
                  />
                  <BsMicFill />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
