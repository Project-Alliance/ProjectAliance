import PropTypes from "prop-types"
import React from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";
import { auth } from "../../firebase.js";
import Logo from '../../../../../../assets/gmail.png';
import { openSendMessage } from "../../features/mailSlice";
import AddIcon from "@mui/icons-material/Add";


function Header({SetSide}:any) {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();



  return (
    <div className="header">
      <div className="header-left">
        <IconButton onClick={()=>SetSide()}>
          <MenuIcon />
        </IconButton>
        <img
          src={Logo}
          alt="gmail logo"
        />
      </div>
      {/* <div className="header-middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className="header-inputCaret" />
      </div> */}
      <div className="header-right">
        {/* <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton> */}
        <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
        <IconButton>
          <AppsIcon />
        </IconButton>
        {/* <Avatar onClick={signOut} src={user?.photoUrl} /> */}
      </div>
    </div>
  );
}

Header.propTypes = {
  SetSide: PropTypes.func
}

export default Header;
