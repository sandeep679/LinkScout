import React, { useContext, useState } from 'react'
import '../styles/Navbar.css'
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import logo from '../../assests/logo.png'
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../functions/UserContext';


function Navbar() {
  const [nav,setNav] = useState(false);
  const {loggedIn} =useContext(UserContext)
  return (
    <>
    <div className='navigation'>
        <Link to={'/'}><img src={logo} alt="" className='logo' /></Link>
        {/* <img src={logo} alt="" className='logo' /> */}
        {/* <h1 className='title'>Company</h1> */}
        <div className='nav-items'>
          <div className='nav-link'>
              <Link to={'/'} className='router-link'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              {
                loggedIn? (
                  <Link to={'/user'}><li>Dashboard</li></Link>
                ):(
                  <>
                  <Link to={'/register'}><li className='register-btn'>Sign up</li></Link>
                  <Link to={'/login'}><li className='login-btn'>sign in</li></Link>
                  </>
                )
              }
          </div>
        </div>
        <div className='nav-mobile' onClick={()=>{setNav(!nav)}}>
          {nav ?<MdOutlineClose size={30} /> : <LuMenu  size={30} /> }
        </div>
        {
          nav && (
            <div className='nav-items-mobile'>
              <Link to={'/'}><li onClick={()=>{setNav(false)}}>Home</li></Link>
              <Link to='/about'><li onClick={()=>{setNav(false)}}>About</li></Link>
              {
                loggedIn? (
                  <Link to={'/user'}><li>Dashboard</li></Link>
                ):(
                  <>
                  <Link to={'/register'}><li>Sign up</li></Link>
                  <Link to={'/login'}><li>sign in</li></Link>
                  </>
                )
              }
            </div>
          )
        }
    </div>
    <Outlet/>
    </>
  )
}

export default Navbar