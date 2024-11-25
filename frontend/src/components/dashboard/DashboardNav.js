import React, { useState } from 'react'
import '../styles/Navbar.css'
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import logo from '../../assests/logo.png'
import { Link, Outlet } from 'react-router-dom';


function DashBoardNav() {
  const [nav,setNav] = useState(false);
  return (
    <>
    <div className='navigation'>
        <Link to={'/'}><img src={logo} alt="" className='logo' /></Link>
        {/* <img src={logo} alt="" className='logo' /> */}
        {/* <h1 className='title'>Company</h1> */}
        <div className='nav-items'>
          <div className='nav-link'>
              <Link to={'/user'}><li>Dashboard</li></Link>
              <Link to='/user/dashboard'><li>Manage</li></Link>
              <Link to={'/user/profile'}><li>Profile</li></Link>
              <Link to={'/user/logout'}><li className='logout-btn'>Logout</li></Link>
          </div>
        </div>
        <div className='nav-mobile' onClick={()=>{setNav(!nav)}}>
          {nav ?<MdOutlineClose size={30} /> : <LuMenu  size={30} /> }
        </div>
        {
          nav && (
            <div className='nav-items-mobile'>
              <Link to={'/user'}><li onClick={()=>{setNav(false)}}>Dashboard</li></Link>
              <Link to='/user/dashboard'><li onClick={()=>{setNav(false)}}>Manage</li></Link>
              <Link to={'/user/profile'}><li onClick={()=>{setNav(false)}}>Profile</li></Link>
              <Link to={'/user/logout'}><li className='logout-btn'>Logout</li></Link>
            </div>
          )
        }
    </div>
    <Outlet/>
    </>
  )
}

export default DashBoardNav