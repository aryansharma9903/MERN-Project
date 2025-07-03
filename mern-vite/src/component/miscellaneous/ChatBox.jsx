import React from "react";
import { ChatState } from "../../Context/chatProvider";
import "./ChatBox.css";
import SingleChat from "./SingleChat";
import { getSender } from "../../config/ChatLogic";

const ChatBox = ( {fetchAgain, setFetchAgain} ) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const isMobile = window.innerWidth <= 768;


  if (!selectedChat) {
    return <div className="chat-box-text">Select a user to start chatting</div>;
  }

      return (
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
                  {getSender(user, selectedChat.users)}
              </> ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {/* <UpdateGroupChatModal 
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                      /> */}
                </>)}
          </span>
        </div>

        {/* Chat UI body */}
        <div className="boxx">
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div>
    );

};

export default ChatBox;
