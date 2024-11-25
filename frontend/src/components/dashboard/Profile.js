import React, { useContext, useState } from "react";
import "./styles/Profile.css";
import UserData from '../functions/UserData';
import { useForm } from 'react-hook-form';
import axios from "axios";

function Profile() {
  const {user} = useContext(UserData);
  const [error,setError] = useState(false);
  const [success,setSuccess]=useState(false);

  const {register,handleSubmit ,formState: { errors }} = useForm();

  const handlePasswordUpdate = async(form)=>{
    try {
      const response = await axios.post(
        `https://linkscout-j2of.onrender.com/user/update`,{
          password:form.password
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.data.status){
        setError(false);
        setSuccess(true);
      }
      else{
        setError(true);
      }
      
      
    } catch (error) {
      setError(true);
    }

  }

  const onSubmit = async(data) => {
    if(data.password !== data.password_check)
      setError(true);
    else{
      handlePasswordUpdate(data);
    }
};
  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Profile Page</h1>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <h2 className="up-head">Update Password</h2>
        <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
        <table className="update-table" onClick={()=>{setError(false);setSuccess(false)}}>
              <tbody>
                <tr>
                  <td><label htmlFor="currentPassword">Current Password:</label></td>
                  <td><input
              type="text"
              id="currentPassword"
              name="currentPassword"
              required  {...register("oldpassword")}
            /></td>
                </tr>
                <tr>
                  <td><label htmlFor="newPassword">New Password:</label></td>
                  <td><input
              type="text"
              id="newPassword"
              name="newPassword"
               {...register("password", {
              required: true,
              minLength: 6
            })}/>
            </td>
                </tr>
                <tr>
                  <td><label htmlFor="confirmPassword">Confirm New Password:</label></td>
                  <td><input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              {...register("password_check", {
              required: true,
              minLength: 6
            })}/>
            </td>
                </tr>
              </tbody>
            </table>
            {error ? (<p className="up-error">Check Password and Try Again !</p>):(<></>)}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg up-error">
                Password should be at-least 6 characters.
              </p>
            )}
            {success ? (<p className="up-success">Password Updated Successfully!</p>):(<></>)}
            
          <button type="submit" className="update-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
