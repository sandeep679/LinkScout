import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import QrModal from "./QrModal";
import UpdateModal from './UpdateModal';
import { handleCopyClick } from "../../functions/UserAction";
import axios from "axios";

function UrlCard({ url, index ,UpdateAfterDeletion}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [name,setName] = useState(url.name);
  const [link,setLink] = useState(url.redirectURL);

  const [urlData,seturlData]=useState(url);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdate = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdate = () => {
    setIsUpdateOpen(false);
  };
  const update=(name,newLink)=>{
    setName(name);
    setLink(newLink);
  }

  useEffect(()=>{
    const fetchUrl = async () => {
      try {
        const response = await axios.post(
          "https://linkscout-j2of.onrender.com/url/update",
          {
            id:url._id,
            name:name,
            url:link,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        //console.log(response);
        if(response.data)
          seturlData(response.data);
      } catch (error) {
        console.log('Error while updating');
        
      }
    };
    function performAction(){
      if(url.name !== name || url.redirectURL !== link){
        console.log('updating url card');
        fetchUrl();
      }
    }
    performAction();
    
  },[name,link,url])

  return (
    <>
        <div className="url-data">
          <div className="url-icon">
            <div className="url-NumName">
            <div className="url-number">{index + 1}</div>
            <div className="url-Name">{urlData.name}</div>
            </div>
            <div className="url-action-icon">
              <div className="url-action-update" onClick={openUpdate}>
                <FaPencilAlt />
              </div>
              <div className="url-action-delete" onClick={()=>{UpdateAfterDeletion(urlData._id)}}>
                <MdDelete />
              </div>
            </div>
          </div>

          <div className="url-meta">
            <div className="url-link-store">
              <h4>Original Link : </h4>
              <span>{urlData.redirectURL}</span>
            </div>
            <div className="url-link-store">
              <h4>Shorten Link : </h4>
              <span>{urlData.shortenURL}</span>
            </div>
          </div>

          <div className="url-event">
            <div
              className="action-button"
              onClick={() => {
                handleCopyClick(urlData.shortenURL);
              }}
            >
              Copy Link
            </div>
            <div className="action-button" onClick={openModal}>
              View OR
            </div>
            <div className="action-button">
              <Link to={`/user/analytics/${urlData.shortId}`}>View Analytics</Link>
            </div>
          </div>
        </div>
      <QrModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={url.qrImageUrl}
      />
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={closeUpdate}
        url={url}
        update={update}
      />
    </>
  );
}

export default UrlCard;
