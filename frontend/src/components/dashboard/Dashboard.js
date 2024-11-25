import React, { useEffect, useState } from "react";
import "./styles/Dashboard.css";
import axios from "axios";
import UrlCard from "./user/UrlCard";
import { TailSpin } from "react-loader-spinner";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  
  const [data, setData] = useState([]);

  const[UrlDelete,seturlDelete] = useState(false);

  const UpdateAfterDeletion =async(id)=>{
    console.log(id);
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://linkscout-j2of.onrender.com/url/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.data.success){
        console.log('Deletion Succeed!');
      }
      else{
        console.log('Deletion Failed!');
      }
      
    } catch (error) {
      console.log('Deletion Failed!');
      
    }
    seturlDelete(true);
  }

  
  useEffect(() => {
    const fetchUrl = async () => {
      
      try {
        const response = await axios.get(
          "https://linkscout-j2of.onrender.com/url/user-links",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        setData(response.data);

        setLoading(false);
        seturlDelete(false);
      } catch (error) {
        console.log('error');
        
      }
    };
    fetchUrl();
    
  }, [UrlDelete]);

  return (
    <div className="dash">
      <div className="dash-head">Manage Your All link at one place 😁</div>
      {loading ? (
        <>
          <div className="loading">
            <TailSpin
              visible={true}
              height="150"
              width="150"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </>
      ) : (
        <div className="url-list">
          {data.map((entry,index) => (
            <UrlCard key={index+1} url={entry}  index={index} UpdateAfterDeletion={UpdateAfterDeletion} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
