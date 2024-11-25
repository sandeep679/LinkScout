import './App.css';
import Home from './components/main/Home'
import Login from './components/main/Login';
import About from './components/main/About';
import Register from './components/main/Register';
import Navbar from './components/main/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  useEffect, useState } from 'react';
import DashBoardNav from './components/dashboard/DashboardNav';
import Dashboard from './components/dashboard/Dashboard';
import DashboardHome from './components/dashboard/DashboardHome';
import Profile from './components/dashboard/Profile';
import RedirectUser from './components/RedirectUser';
import Logout from './components/dashboard/Logout';
import UserContext from './components/functions/UserContext';
import UserData from './components/functions/UserData';
import axios from 'axios';
import Analytics from './components/dashboard/user/Analytics';



function App() {
  const [loggedIn, setLoggedIn]=useState(false);
  const [user,setUser] = useState([]);

  useEffect(()=>{
    const CheckAuth =async () => {
      try {
        if(localStorage.getItem('token')){
          const token = localStorage.getItem('token');
          //console.log(token)
          const {data} =await axios.get('https://linkscout-j2of.onrender.com/user/verify',{
            headers:{
              authorization: `Bearer ${token}`,
            }
          });
          
          const verify =data.verify;
          console.log(data);
          
          
          if(!verify){
            setLoggedIn(false);
          }
          else if(verify){
            setUser(data.user);
            setLoggedIn(true);
            console.log('Server Connected');
            
          }
          
          
        }
        else{
          
          const {data} =await axios.get('https://linkscout-j2of.onrender.com/start')
          if(data.status)
            console.log('Server Connected');
          else{
            console.log('Server Unavailable');
          }
        }
      } catch (error) {
        console.log('Server Unavailable');
        
      }
      
    }
    CheckAuth();
    
  },[])
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
    <UserData.Provider value={{ user, setUser }}>
      <div className="App">  
      <BrowserRouter>
      {
          loggedIn ? (
            <Routes>
              <Route path="/user" element={<DashBoardNav/>}>
              <Route index element={<DashboardHome/>} />
              <Route path="/user/dashboard" element={<Dashboard/>} />
              <Route path="/user/profile" element={<Profile/>} />
              <Route path="/user/logout" element={<Logout/>} />
              <Route path="/user/analytics/:shortid" element={<Analytics/>} />
              </Route>
            </Routes>
          ):
          (<>
          </>)
        }
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/redirect/:shortid" element={<RedirectUser/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </UserData.Provider>
    </UserContext.Provider>
  );
}

export default App;









