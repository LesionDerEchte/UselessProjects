import '../css/header.css'
import {Link} from "react-router-dom"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Cookies  from 'js-cookie'
import React, {useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfilePicture from '../image/user-icon.png'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import AccountMenu from './AccountMenu';
function Header(){

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleLogOut = ()=>{
        Cookies.remove('token')
        window.location.reload(false);
    }

  
   

    return(

        <div className="header">
            <Link className='LogoLink' to="/">Soccermap</Link>
            <div className="links">         
            <Link to="/Stadium">Stadien</Link>
            <Link to="/Maps">Maps</Link>
            <Link to="/Community">Community</Link>
            <Link to="/Tickets">Tickets</Link>     
            </div>
            <div className='right-nav'> 
            <AccountMenu></AccountMenu>
            </div>
        </div>
                    

        
    )
}

export default Header;