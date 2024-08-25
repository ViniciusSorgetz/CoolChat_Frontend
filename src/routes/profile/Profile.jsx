import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';
import CoolChatLogo from '../../../public/CoolChatLogo.svg';
import './Profile.css'

const Profile = () =>{

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/home");
  }, []);

  return (
    <div className="home-container">
      <p className="text-light" style={{ textAlign: "center" }}>Sua conta:</p>
      {user && <h2 className="title" style={{ fontSize: "3rem" }}>{user.nick}</h2>}
      <img src={CoolChatLogo} style={{ width: "100px" }} alt="Logo do CoolChat" />
    </div>
  )
}

export default Profile;