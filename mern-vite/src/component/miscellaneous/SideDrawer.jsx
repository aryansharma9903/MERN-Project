import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import LogoutModal from './LogOutModal';
import ProfileModal from './ProfileModal';
import SearchDrawer from './SearchDrawer';
import './SideDrawer.css';

const SideDrawer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      console.warn('Search field is empty');
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
    } catch (error) {
      console.error('Error while searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('/api/chat', { userId }, config);

      // You can update chats here if needed
      console.log('Chat opened:', data);

      setLoadingChat(false);
      setIsSearchOpen(false);
    } catch (error) {
      console.error('Error accessing chat:', error);
      setLoadingChat(false);
    }
  };

  return (
    <div className="top-bar">
      {/* Search Trigger */}
      <div className="search-wrapper" onClick={() => setIsSearchOpen(true)}>
        <i className="fas fa-search search-icon" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          readOnly
        />
      </div>

      {/* App Title */}
      <h2 className="app-title">ChatHub</h2>

      {/* Profile Dropdown */}
      <div className="profile-dropdown-container" ref={dropdownRef}>
        <div className="profile-wrapper" onClick={toggleDropdown}>
          <img
            src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=Me"
            alt="profile"
            className="profile-pic"
          />
          <span className="dropdown-arrow">▼</span>
        </div>

        {showDropdown && (
          <div className="dropdown-menu fade-in">
            <div
              className="dropdown-item"
              onClick={() => {
                setIsProfileOpen(true);
                setShowDropdown(false);
              }}
            >
              Profile
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                setIsModalOpen(true);
                setShowDropdown(false);
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>

      {/* Search Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        searchResult={searchResult}
        loading={loading}
        accessChat={accessChat}
      />

      {/* Logout Modal */}
      {isModalOpen && (
        <LogoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default SideDrawer;
