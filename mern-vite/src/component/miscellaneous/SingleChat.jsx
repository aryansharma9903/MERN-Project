import { ChatState } from '../../Context/chatProvider';
import React, { useState, useEffect, useRef } from 'react';
import './SingleChat.css';
import axios from 'axios';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef(null); // 👈 Ref for auto scroll

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Connect to socket on mount
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
  }, []);

  // Fetch messages when selected chat changes
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
        setMessages(data);
        socket.emit('join chat', selectedChat._id);
        selectedChatCompare = selectedChat;
      } catch (error) {
        console.error('Failed to load messages', error);
      }
    };

    fetchMessages();
  }, [selectedChat, user.token]);

  // Receive messages via socket
  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // optionally show notification
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off('message received');
    };
  }, []);

  // Send new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/message',
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit('new message', data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Message send failed', error);
    }
  };

  return (
    <div className="single-chat-container">
      <div className="messages-container">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.sender._id === user._id ? 'sent' : 'received'}`}
          >
            <span className="message-content">
              <strong>{m.sender.name}</strong>: {m.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* 👈 This is the scroll target */}
      </div>

      <div className="message-input">
        <input
          type="text"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default SingleChat;
