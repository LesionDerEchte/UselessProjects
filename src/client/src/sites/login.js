import '../css/login.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios, { Axios } from 'axios'
import React, { useState } from 'react';
import Cookies  from 'js-cookie'

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';


function Login({ setToken, setReg }){

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const action = (
        <React.Fragment>
          <Button color="error" size="small" onClick={handleClose}>
            Close
          </Button>
          
          
        </React.Fragment>
      );

    const [Username, setUsername] = useState(0);
    const [Password, setPassword] = useState(0);

    const handleChangePassword = event => {
        if(checkVar(event.target.value)){
            setPassword(event.target.value)
        }
    }
        
    const handleChangeUsername = event => {
        if(checkVar(event.target.value)){
            setUsername(event.target.value);
        }   
    }

    const Verify =  ()=>{
        const bodyParameters = {
            "username": null,
            "password": null   
         }

        bodyParameters.username = Username
        bodyParameters.password =  Password
    
        axios.post(`http://${window.location.hostname}:3001/users/login`,bodyParameters)
        .then((response)=>{
        if(response.data.accessToken != null){
            Cookies.set('token', response.data.accessToken
            , {expires: (1 / 1440) * 1140 })
            window.location.reload(false);
        }
            }).catch(err => {
                
                if(err.response.status === 400){
                    handleClick() //Fehlermeldung anzeigen
                } 
            })
         }
    return(
        <div>
       
        <div className="Login">
        
           
           <div className='Login-form'>

            <div className='Picture'></div>

            <div className='Inputs'>

            <Snackbar 
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="User doesn't exist!"
                action={action}
            />


                Welcome back, sign in and get started!
                
                <TextField onChange={handleChangeUsername} id="outlined-basic" label="Username" variant="outlined" /><br></br>
                
                <TextField onChange={handleChangePassword}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    /><br></br>
                    
                <Button onClick={()=>{
                    Verify()
                   

                }} variant="contained">Sign in</Button>
                
                <Button onClick={()=>{
                    setReg(true)
                }}>No account yet?</Button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Login;

function checkVar(variable){
    if(!variable.includes("=")){
      if(!variable.includes(";")){
        if(!variable.includes("--")){
          return true
        }
        else{
          alert('"--" nicht erlaubt!')
          return false
        }
      }
      else{
        alert('";" nicht erlaubt!')
        return false
      }
    }
    else{
      alert('"=" nicht erlaubt!')
      return false
    }
  }