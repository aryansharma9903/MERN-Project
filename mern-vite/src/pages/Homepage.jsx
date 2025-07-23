import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../component/Login';
import Signup from '../component/Signup';
import './Homepage.css';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/chats");
  }, [navigate]);

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="homepage-title">Welcome to Chat App</h1>
      </header>

      <div className="tabs">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      <div className="content">
        {activeTab === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Homepage;
