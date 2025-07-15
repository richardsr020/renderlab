import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

const Notification = ({ message, type = 'info', onClose }: NotificationProps) => {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white bg-${type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue'}-600`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-white font-bold">&times;</button>
      )}
    </div>
  );
};

export default Notification;
