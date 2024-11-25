import React, { useState } from 'react';
import '../styles/UpdateModal.css'; // Optional: For styling the modal
import { useForm } from 'react-hook-form';

const Modal = ({ isOpen, onClose, url,update }) => {
  
  const {register,handleSubmit } = useForm();
  const [name,setName] = useState(url.name);
  const [link,setLink] = useState(url.redirectURL);

  const onSubmit = async(data) => {
    console.log(data);
    update(name,link);
    onClose();

    };

    const handleNameChange=(e)=>{
        setName(e.target.value);
    }
    const handleLinkChange=(e)=>{
        setLink(e.target.value);
    }

    if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className='url-update' onSubmit={handleSubmit(onSubmit)}>
                <h2>Update Url Details</h2>
                <input type="text" placeholder='URL Name'  {...register("name")} value={name} onChange={handleNameChange}/>
                <input type="text" placeholder='Paste URL Here !'  {...register("url")} value={link} onChange={handleLinkChange} />
                <button className="close-button" type='submit' >Update</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
