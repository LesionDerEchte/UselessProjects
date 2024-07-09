import React,{useState,useEffect } from 'react';
import axios, { Axios } from 'axios'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cookies  from 'js-cookie'
import {Link} from "react-router-dom"
import HelpIcon from '@mui/icons-material/Help';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [Name, setName] = React.useState("");
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

useEffect(() => {
    const token = Cookies.get('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`http://${window.location.hostname}:3001/profile`,config).then((response)=>{
    
        setName(response.data)
        })
   
  }, []);


  return (
   <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
 
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
           
          >
            <Avatar sx={{ width: 40, height: 40}}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
   
        <Link className='menu-link' to={`/User/${Name}`}>
        <MenuItem onClick={handleClose}>
          <Avatar /> {Name}
        </MenuItem>
        
        </Link>
       
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          Hilfe
        </MenuItem>
        <Link className='menu-link' to="/Profile">
        <MenuItem onClick={handleClose}>
            
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        </Link>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
  );
}
