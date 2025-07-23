import React from 'react';
import './LogOutModal.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="logout-modal">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={onLogout} className="logout-btn">Logout</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
