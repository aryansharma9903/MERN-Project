import React, { useState } from 'react';
import SideDrawer from '../component/miscellaneous/SideDrawer.jsx';
import MyChats from '../component/miscellaneous/MyChats.jsx';
import ChatBox from '../component/miscellaneous/ChatBox.jsx';
import { ChatState } from '../Context/chatProvider';
import './ChatPage.css';

const ChatPage = () => {
  const { selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="chat-page-wrapper">
      {/* ✅ Add the top navigation bar */}
      <SideDrawer />

      <div className="chat-container">
        {/* Left panel: hide on mobile if chat is selected */}
        <div className={`chat-left ${isMobile && selectedChat ? 'mobile-hide' : 'mobile-show'}`}>
          <MyChats fetchAgain={fetchAgain} />
        </div>

        {/* Right panel: hide on mobile if no chat is selected */}
        <div className={`chat-right ${isMobile && !selectedChat ? 'mobile-hide' : 'mobile-show'}`}>
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
