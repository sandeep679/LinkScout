import React from 'react';
import '../styles/Modal.css'; // Optional: For styling the modal
import { ImageDownload } from '../../functions/UserAction';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={imageUrl} alt="Popup" className="modal-image" onClick={()=>{ImageDownload(imageUrl,'qr-code')}}/>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
