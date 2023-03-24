import React, { useState } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Fab from '@mui/material/Fab';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Logo from './images/logo.png';

function Header(props){
  function logout(event){
    props.setSignIn(false);
    props.loadUser(null);
  }

  setInterval(updateTime, 1000);

  let time = new Date().toLocaleTimeString();
  const [curTime, setTime] = useState(time);
  function updateTime() {
    time = new Date().toLocaleTimeString();
    setTime(time);
  }

  return (
  <header>
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-start align-items-center">
        <img className="logo me-1" src={Logo} alt="logo" />
        <BorderColorIcon className="me-4" sx={{ fontSize: 40 }} />
        <div className="name"> Hello, {props.user.name}!</div>
      </div>
      <div className="align-items-center">
        <button className="time-div"><AccessTimeIcon sx={{ fontSize: 40 }} /> {curTime}</button>
        <Fab variant="extended" className="logout-button" onClick={logout}>Sign Out</Fab>
      </div>
    </div>
  </header>
  );
}

export default Header;
