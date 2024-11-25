import React from 'react'
import '../styles/Footer.css';
import { FaArrowRight } from "react-icons/fa";
import logo from '../../../assests/logo.png'
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className='footer' >
        <div className='footer-main'>
            <div className='footer-head'>
                More than a link shortener
            </div>
            <div className='footer-para'>
            Knowing how your clicks and scans are performing should be as easy as making them. Track, analyze, and optimize all your connections in one place.
            </div>
            <div className='footer-button'>
                 <Link to={'/register'}>Get Started For Free <FaArrowRight /></Link>
            </div>
        </div>
        <div className='footer-divider'>
                <hr className='foot-div' />
        </div>
        <div className='foot-end'>
          <img src={logo} alt="" />
          <div>© 2024 Made with ♥</div>
        </div>
    </div>
  )
}

export default Footer