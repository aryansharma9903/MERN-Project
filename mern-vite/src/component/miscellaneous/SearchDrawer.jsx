import React from 'react';
import './SearchDrawer.css';
import ChatLoading from './ChatLoading';

const SearchDrawer = ({
  isOpen,
  onClose,
  search,
  setSearch,
  handleSearch,
  searchResult,
  loading,
  accessChat
}) => {
  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <h3>Search Users</h3>
          <span className="close-btn" onClick={onClose}>✕</span>
        </div>

        <div className="search-input-group">
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a name or email..."
          />
          <button className="search-button" onClick={handleSearch}>Go</button>
        </div>

        <div className="search-results">
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult.map((user) => (
              <div
                key={user._id}
                className="search-user"
                onClick={() => accessChat(user._id)}
              >
                {user.name} — <small>{user.email}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
