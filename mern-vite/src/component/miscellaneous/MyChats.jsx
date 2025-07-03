import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import axios from "axios";
import "./MyChats.css";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = window.innerWidth <= 768;

  const fetchChats = async () => {
    if (!user) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.error("Failed to load chats", error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user, fetchAgain]);

  return (
    <div className={`my-chats-wrapper ${isMobile && selectedChat ? "hide-on-mobile" : ""}`}>
      <div className="my-chats-header">
        <h2>MY CHATS</h2>
        {isOpen && <GroupChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        <button className="create-group-btn" onClick={() => setIsOpen(true)}>
          + New Group Chat
        </button>
      </div>

      <div className="chat-list">
        {chats ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`chat-item ${selectedChat?._id === chat._id ? "selected" : ""}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-title">
                {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
              </div>
              {chat.latestMessage && (
                <div className="chat-message">
                  <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </div>
              )}
            </div>
          ))
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
