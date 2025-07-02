import React from 'react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>User Profile</h2>
        <img src={user.pic} alt="Profile" className="modal-profile-pic" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
