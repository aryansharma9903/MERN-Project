import { ChatState } from '../../Context/chatProvider'
import React from 'react'
import './SingleChat.css'
const SingleChat = ( {fetchAgain, setFetchAgain} ) => {

    const {user, selectedChat, setSelectedChat} = ChatState();
  return (
    <div className='chat-message'>
        <input type="text" />
        <button>SEND</button>
    </div>
  )
}

export default SingleChat
