import react, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { CgArrowRightO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import Logo from "../../styles/images/logo.png";
import { ButtonText } from "./Button";
import MaleAvatar from "../../styles/images/male.png";
import FemaleAvatar from "../../styles/images/female.png";

const Header = () => {
  const navigate=useNavigate()

  const onClickLogout=(e)=>{
      localStorage.setItem("auth-token", "");
      navigate("/login");
    };

  return (
    
      <div className="header__container">
        <img src={Logo} alt="logo" className="logo logo--small" />

        <div className="header__right">
          <img alt="avt" src={FemaleAvatar} className="avatar--small" />
          <div className="button button--logout">
            <div onClick={(e)=>onClickLogout()}>
            <ButtonText name="LOGOUT" >
              <CgArrowRightO className="icon icon--small" />
            </ButtonText></div>
          </div>
        </div>
      </div>

  );
};

export default Header;
