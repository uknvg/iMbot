import React, { useEffect, useState } from 'react';
import '../funcs-design/LogoutModal.css';

interface LogoutModalProps {
  showModal: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ showModal, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [showModal]);

  if (!showModal) return null; 

  return (
    <div className={`modal-overlay ${isVisible ? 'active' : ''}`}>
      <div className="modal">
        <h3>هل أنت متأكد من تسجيل خروجك؟</h3>
        <div className="modal-buttons">
          <button className='submit' onClick={onConfirm}>تسجيل خروج</button>
          <button className='cancle' onClick={onCancel}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
