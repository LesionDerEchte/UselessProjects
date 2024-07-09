import '../css/profile.css'

import React,{useState,useEffect } from 'react';
import axios, { Axios } from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Cookies  from 'js-cookie'
import { display, flexbox, height } from '@mui/system';
import TabPanel from '../comp/BasicTabs';
import BasicTabs from '../comp/BasicTabs';
function Profile(){

    const [Name, setName] = useState();

    const cardStyle = {
        
        width: '100%',
        
        
        
    }

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Your Account
            </Typography>
            <Typography variant="h5" component="div">
            
            </Typography>
            <BasicTabs name={Name}></BasicTabs>            
            
          </CardContent>
          
        </React.Fragment>
      );


    useEffect(() => {
        getProfile()
      }, []);
    
    
        const getProfile = ()=>{
        const token = Cookies.get('token')
        console.log(token)
        const bodyParameters = {
          "userid": null,
          "ratingid": null
           
       }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`http://${window.location.hostname}:3001/profile`,config).then((response)=>{
    
        setName(response.data)
        })
    }

    return(
        <div className="profile-page">
            
            
            <Box className='profile' sx={{ minWidth: 275 }}>
            <Card style={cardStyle} variant="outlined">{card}</Card>
          
            </Box>
        </div>
    )
}

export default Profile;