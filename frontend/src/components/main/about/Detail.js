import React from 'react';
import image from '../../../assests/detail-logo.jpg'
import '../styles/Detail.css' 
import { FaArrowRight } from "react-icons/fa";


function Detail() {
  return (
    <div className='detail'>
        {/* <div className='detail-logo'><img src={logo} alt="" /></div> */}
        <div className='detail-head'>
            <div className='detail-title'>
                <h1>See how to use LinkScout to leverage your works</h1>
            </div>
            <div>
                <img src={image} alt="" width='100px'  className='d-img' />
            </div>
        </div>
        <div className='detail-section'>
            <div className='section-title'><FaArrowRight size={25} /> Build stronger Digital connections</div>
            <div className='section-meta'>Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the Bitly Connections Platform.</div>
            
            <div className='section-title'><FaArrowRight size={25} /> Everything in one place</div>
            <div className='section-meta'>Aggregate, manage, and track all of your Link-in-bio links from a single, centralized location.</div>

            <div className='section-title'><FaArrowRight size={25} /> Drive more views, sales, subscribers, and leads</div>
            <div className='section-meta'>Make it easy for your audience to discover your best, most relevant content and take action that leads to bigger results and deeper engagement.</div>
        
            <div className='section-title'><FaArrowRight size={25} /> Make your social media profiles work harder</div>
            <div className='section-meta'>Curate, organize, and track all your best links, so audiences can discover and engage with more of your content.</div>
        
        </div>
    </div>
  )
}

export default Detail