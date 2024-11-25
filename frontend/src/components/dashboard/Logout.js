import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../functions/UserContext';

function Logout() {
    const navigate=useNavigate();
    const {setLoggedIn} = useContext(UserContext)
  useEffect(()=>{
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  })
}

export default Logout