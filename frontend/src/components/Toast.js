import React from 'react';

const Toast = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast ${type}`} role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss message">
        x
      </button>
    </div>
  );
};

export default Toast;
