import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import "./ChatBox.css";
import SingleChat from "./SingleChat";
import { getSender } from "../../config/ChatLogic";
import ProfileModal from "./ProfileModal";
import { getSenderFull } from "../../config/ChatLogic";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const ChatBox = ( {fetchAgain, setFetchAgain} ) => {
  const { user, selectedChat, setSelectedChat, selectedUser } = ChatState();
  const isMobile = window.innerWidth <= 768;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  if (!selectedChat) {
    return <div className="chat-box-text">Select a user to start chatting</div>;
  }

      return (
        <>
        <div className="chat-box">
        
        {/* Header bar */}
        <div className="chat-header-bar">
          {isMobile && (
          <button className="back-btn" onClick={() => setSelectedChat(null)}>
            ←
          </button>
        )}
          <span className="chat-title">
            {!selectedChat.isGroupChat ? (
              <>
              {getSender(user, selectedChat.users).toUpperCase()}
              <button
                className="eye-btn"
                onClick={() => setIsProfileOpen(true)}
                title="View Profile"
              >
                👁️
              </button>
              
            </>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase()}
              <button
                className="eye-btn"
                onClick={() => setIsGroupModalOpen(true)}
                title="View Group Modal"
              >
                👁️
              </button>
              
            </>
          )}
        </span>
      </div>

        {/* Chat UI body */}
        <div className="boxx">
          <SingleChat fetchAgain={fetchAgain} setbut FetchAgain={setFetchAgain} />
        </div>
      </div>

  {!selectedChat.isGroupChat && (
    <ProfileModal
      isOpen={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
      user={getSenderFull(user, selectedChat.users)}
    />
  )}

  {selectedChat.isGroupChat && (
    <UpdateGroupChatModal
      isOpen={isGroupModalOpen}
      onClose={() => setIsGroupModalOpen(false)}
      fetchAgain={fetchAgain}
      setFetchAgain={setFetchAgain}
    />
  )}
      
      </>
    );
    

};

export default ChatBox;
