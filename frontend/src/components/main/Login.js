import React, { useState,useContext } from 'react';
import './styles/Login.css';
import logo from '../../assests/logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../functions/UserContext';
import UserData from '../functions/UserData';

function Login() {
  const {setLoggedIn} = useContext(UserContext);
  const {setUser} = useContext(UserData);

  const [show,setShow] =useState(false);
  const [Error,setError] =useState(false);
  const navigate = useNavigate();

  const handleLogin =async (form)=>{
    let checkAuth;
    try {
      const result =await axios.post('https://linkscout-j2of.onrender.com/user/login',form,{
        headers:{
            'Content-Type': 'application/json'
          }
      });
      const {response,user}=result.data;
      console.log(response);
      checkAuth= response.status;
      console.log(typeof checkAuth);
      
      if(checkAuth){
        console.log('local');
        
        localStorage.setItem('token',result.headers.token);
        setUser(user);
      }
        
      
    } catch (error) {
      
      return false;
    }
    return checkAuth;
    
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async(data) => {
    console.log(data);
    let result= await handleLogin(data) ;
    
    if(result){
      setLoggedIn(true);
      navigate('/user');
    }
    else{
      setError(true);
    }
  };

  return (
    <div className='login'>
    <div className='form-div'>
      <img src={logo} alt=""/>
      <h3 className='form-head'>Hi, Welcome Back !</h3>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)} onClick={()=>{setError(false)}}>
          

          <input type="email" placeholder='Email' {...register("email",{
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })}/>
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg">Email is not valid.</p>
          )}


          <input type={show? 'text': 'password'}  placeholder='Password'{...register("password", {
              required: true,
              minLength: 6
            })}/>
            {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">Password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}
            {
              Error ? (<p className='login-error'>Please check your credentials !</p>):(<></>)
            }

          <label htmlFor="show"><input type="checkbox" onChange={(e)=>setShow(e.target.checked)}  name='show' id='show'/> Show Password</label>
          <button>Login</button>
        </form>
    </div>
    </div>
  )
}

export default Login