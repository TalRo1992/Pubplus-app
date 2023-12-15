import React, { useEffect, useState } from "react";
import { usePubContext } from "../../store/provider";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from '../../assets/cropped-PubPlus-Logo.png';
import { logout } from "../../services/auth.api";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const pubContext = usePubContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      setIsLoggedIn(pubContext.isAuthenticated)
    }, [pubContext.isAuthenticated])

  const handleLogout = async () => {
  
    try {
      const response:any = await logout()
    if(response.status === 200){
        pubContext.setFields({ user: null})
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return isLoggedIn ? (
    <div className="header" >
      <img src={logo} className="header-logo"/>
      <small>Hello {pubContext?.user?.username} you are <b>{pubContext?.user?.status}</b></small>
      <Button handleClick={handleLogout} title={"Logout"} />
    </div>
  ) : null;
};

export default Header;
