import React, { useContext, useState } from 'react'
import './styles/DashboardHome.css';
import { FaRegCopy } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import UserData from '../functions/UserData';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import homeImage from '../../assests/home-image.svg'
import isUrl from 'is-url';
import {ImageDownload,handleCopyClick} from '../functions/UserAction'

function DashboardHome() {
    const {user} = useContext(UserData);
    const {register,handleSubmit } = useForm();

    const [UrlData , setUrlData] = useState([]);
    const [show , setShow] = useState(false);
    const [loading , setLoading] = useState(false);

    const handleUrl =async (form)=>{
        try {
          const response =await axios.post('https://linkscout-j2of.onrender.com/url',form,{
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
          
          if(response.data){
            setUrlData(response.data);
            return true;
          }
          else{
            return false;
          }
          
        }
        catch (error) {
          return false;
        }
      }

    const onSubmit = async(data) => {
        console.log(data);
        if(data.url.length ===0 || !isUrl(data.url)){
            return;
          }

        
        setLoading(true);
        

        let result = await handleUrl(data);
        if(result){
            setLoading(false);
            setShow(true);
        }
        
    };
    


  return (
    <div className='dash-home'>
        <div>
        <h1>
            Welcome to LinkScout 👋
        </h1> 
        </div>
        

        <div className='home-panel'>
        <div className='home-user'>
            <div className='user-name'><h2>Hello, {user.name}</h2></div>
            <div className='user-para'>
                <p>
                    Generate new url for Your Business/Work !
                </p>
            </div>
            <form className='url-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='url-input'>
                    <input type="text" placeholder='URL Name' required {...register("name")}/>
                    <input type="text" placeholder='Paste URL Here !' required {...register("url")}/>
                    <button type='submit'>Generate ⚒</button>
                </div>
            </form>
        </div>

        <div className='home-image'>
            <img src={homeImage} alt="" />
        </div>

        </div>
        

        {   
            loading ?(
                <>
                <div className='loading'>
                <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                />
                </div>
                </>
            ):
            (
                show ?(
                <>
                <div className='url-result'>
                    <div className='url-name'><h3>{UrlData.name}</h3></div>
                    <div className='fetch-result'>
                        <div className='link-result'>
                            <div className='url-org'>{UrlData.redirectURL}</div>
                            <div className='url-gen'>{UrlData.shortenURL}</div>
                            <div className='url-copy' onClick={()=>{handleCopyClick(UrlData.shortenURL)}}>Copy Link <FaRegCopy /> </div>
                        </div>
                        <div className='qr-result'>
                            <img className='qr' src={UrlData.qrImageUrl} alt='qr-image'/>
                            <div className='qr-down' onClick={()=>{ImageDownload(UrlData.qrImageUrl,UrlData.shortId)}}>Download <IoMdDownload /></div>
                        </div>
                    </div>
                </div>
                </>
            ):
            (
                <>
                </>
            )
            )

            
        }
        

    </div>
  )
}

export default DashboardHome