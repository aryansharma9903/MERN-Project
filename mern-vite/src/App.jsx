import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import { useEffect, useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={userInfo ? <Navigate to="/chats" /> : <Homepage />}
        />
        <Route
          path="/chats"
          element={userInfo ? <ChatPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
