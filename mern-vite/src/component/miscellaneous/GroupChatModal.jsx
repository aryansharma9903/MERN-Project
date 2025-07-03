import axios from 'axios';
import { ChatState } from '../../Context/chatProvider';
import React, { useState } from 'react'
import './GroupChatModal.css';
import { useDisclosure } from '@chakra-ui/react';

const GroupChatModal = ({ children, isOpen, onClose}) => {
    const [groupName, setGroupName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user, chats, setChats} = ChatState();


    const handleUserSearch = async (query) => {
        setSearchTerm(query);
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const {data} = await axios.get(`/api/user?search=${searchTerm}`, config);
            console.log(data);
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            console.error('Error accessing chat:', error);
        }
    }

    const handleAddUser = (user) => {
        if (!selectedUsers.find((u) => u._id === user._id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    }


    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== userId));
    };

    const handleCreate = async () => {
    if (!groupName || selectedUsers.length === 0) {
        alert('Group name and at least one user required');
        return;
    }

    try {
        const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        };

        const { data } = await axios.post(
        '/api/chat/group',
        {
            name: groupName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
        }, config
        );

        // Update the chat list
        setChats([data, ...chats]);

        // Reset modal state
        setGroupName('');
        setSelectedUsers([]);
        setSearchTerm('');
        setSearchResults([]);

        onClose();
        alert('New Group Chat Created');
    } catch (error) {
        alert('Failed to create group:', error);
    }
    };

   return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create Group Chat</h3>

        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="search-section">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => handleUserSearch(e.target.value)}
          />
        </div>

        <div className="selected-users">
          {selectedUsers.map((user) => (
            <span key={user._id} onClick={() => handleRemoveUser(user._id)}>
              {user.name} ✕
            </span>
          ))}
        </div>

        <div className="search-results">
          {searchResults.map((user) => (
            <div key={user._id} onClick={() => handleAddUser(user)}>
              {user.name} ({user.email})
            </div>
          ))}
        </div>

        <button className="create-btn" onClick={handleCreate}>Create Group</button>
      </div>
    </div>
  );
}

export default GroupChatModal
