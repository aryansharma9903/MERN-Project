import React, { useState } from 'react'
import './UpdateGroupChatModal.css'
import { ChatState } from '../../Context/chatProvider';
import axios from 'axios';

const UpdateGroupChatModal = ( {fetchAgain, setFetchAgain, isOpen, onClose} ) => {
  if (!isOpen) return null;
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const {selectedChat, setSelectedChat, user} = ChatState();

  const handleRemoveUser = async(user1) => {
    if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
        alert('Only Group Admin can remove a user');
        return
    }
    else{
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const {data} = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: user1._id
            }, config)
            if (user1._id === user._id) {
                setSelectedChat(null);
            } else {
                setSelectedChat(data);
            }
            setFetchAgain(!fetchAgain);
        } catch (error) {
            alert('Error Occured');
        }
    }
  }

  const handleAddUser = async(user1) => {
    if(selectedChat.users.find((u) => u._id === user1._id)){
        alert('User Already in the Group!')
        return;
    }

    if(selectedChat.groupAdmin._id !== user._id){
        alert('Only Admins can add someone!');
        return;
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const {data} = await axios.put('/api/chat/groupadd', {
            chatId: selectedChat._id,
            userId: user1._id
        }, config)

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
    } catch (error) {
        alert('Error Occured');
    }
  }

  const handleRename = async() => {
    if (!groupChatName) return

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const { data } = await axios.put('/api/chat/rename', {
            chatId: selectedChat._id,
            chatName: groupChatName,
            }, config
        );

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
    } catch (error) {
        alert('Error Occured');
    }
    setGroupChatName('');
  }

  const handleSearch = async(query) => {
    setSearch(query);
    if(!query){
        return;
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }

        const {data} = await axios.get(`/api/user?search=${query}`, config);
        setSearchResult(data);
    } catch (error) {
        alert('Error Occured');
    }

  }

  return (
    <div className="modal-overlay" onClick={onClose} >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>GROUP INFO</h2>
        <div className="group-top-section">
        <div className="selected-users">
            {selectedChat.users.map((user) => (
            <span key={user._id} onClick={() => handleRemoveUser(user)}>
                {user.name} ✕
            </span>
            ))}
        </div>
        <div className="input-button-row">
            <input type="text" placeholder="Chat Name" value={groupChatName} onChange={(e) => {setGroupChatName(e.target.value)}} />
            <button onClick={handleRename}>Update</button>
        </div>
        </div>
        <input type="text" placeholder='Add users to the group' onChange={(e) => handleSearch(e.target.value)} />
          {searchResult.map((user) => (
          <div key={user._id} className="search-result" onClick={() => handleAddUser(user)}>
            {user.name}
          </div>
        ))}
        <button className="leave-btn" onClick={() => handleRemoveUser(user)}>Leave Group</button>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default UpdateGroupChatModal
