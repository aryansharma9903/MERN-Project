import React, { useEffect, useState } from 'react';
import Login from '../component/Login';
import Signup from '../component/Signup';
import './Homepage.css'; // Optional: for styling
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if(user) navigate('/chats');
  }, [navigate]);

  return (
    <div className="homepage-container">
      <div className="header">
        <h1 className="homepage-title">Welcome to Chat App</h1>
      </div>

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
