import { ChatState } from '../../Context/chatProvider'
import React from 'react'

const SingleChat = ( {fetchAgain, setFetchAgain} ) => {

    const {user, selectedChat, setSelectedChat} = ChatState();
  return (
    <div>
      Single Chat
    </div>
  )
}

export default SingleChat
