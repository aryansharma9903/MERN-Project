import React from "react";
import { ChatState } from "../../Context/chatProvider";
import "./ChatBox.css";

const ChatBox = () => {
  const { selectedChat, setSelectedChat } = ChatState();
  const isMobile = window.innerWidth <= 768;

  if (!selectedChat) {
    return <div className="chat-box">Select a user to start chatting</div>;
  }

  return (
    <div className="chat-box">
      {isMobile && (
        <button className="back-btn" onClick={() => setSelectedChat(null)}>
          ← Back
        </button>
      )}
      {/* Chat UI here */}
      <div className="chat-header">{selectedChat.chatName}</div>
      {/* ...messages, input etc. */}
    </div>
  );
};

export default ChatBox;
