
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React, {useState,useEffect, useLayoutEffect } from 'react';
import Footer from './comp/footer';
import Greet from './comp/Greet';
import Header from './comp/header';
import header from './comp/header';
import Profile from './sites/profile';
import Start from './sites/start';
import News from './sites/news';
import Login from './sites/login';
import axios, { Axios } from 'axios'


import Cookies  from 'js-cookie'
import Register from './sites/register';
import Backdrop from '@mui/material/Backdrop';
import User from './sites/User';

import {Route, Routes} from "react-router-dom"
import Stadium from './sites/stadium';
import GetStarted from './sites/GetStarted';
import Maps from './sites/maps';
import StadiumDetail from './sites/StadiumDetail';
import Community from './sites/Community';
import Tickets from './sites/tickets'
import Navbar from './comp/navbar';
function App() {

  const [spinner, setSpinner] = useState(false);    

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const checkCookie = ()=>{
    const tokenTemp = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${tokenTemp}` }
  };
  axios.get(`http://${window.location.hostname}:3001/authenticate`,config).then((response)=>{

      if(response.data){
        setToken(tokenTemp)
      }
    })
  }


  
  useLayoutEffect(() => {
    setOpen(true)
    setSpinner(true)
    checkCookie()
  
    const timer = setTimeout(() => {
      setOpen(false)
    }, 1000);
   
  }, []);



  const [token, setToken] = useState();
  const [reg, setReg] = useState();
  
  if(reg == true){
    return <Register setReg={setReg}></Register>
  }

  if(!token) {
    return <div><Login setReg={setReg} setToken={setToken} /></div>
  }

  


  return (

    <div>

{
    open ?   <div className='Spinner'>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop></div>

: 
      <div>
      <Header></Header> {/* Statisch */}
      <Routes>
      <Route path="/" element={<div><Start></Start></div>}></Route>     
      <Route path="/Stadium" element={<Stadium></Stadium>}></Route>
      <Route path="/Maps" element={<Maps></Maps>}></Route>
      <Route path="/Tickets" element={<Tickets></Tickets>}></Route>
      <Route path="/Stadium/:id" element={<StadiumDetail></StadiumDetail>}></Route>
      <Route path="/User/:username" element={<User></User>}></Route>
      <Route path="/Community" element={<Community></Community>}></Route>
      <Route path="/Profile" element={<Profile></Profile>}></Route>
      </Routes>
      <Footer></Footer> {/* Statisch */}
      </div>
}
    </div>
  );

}

export default App;
