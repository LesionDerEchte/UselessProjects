import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios, { Axios } from 'axios'
import Snackbar from '@mui/material/Snackbar';
import '../css/register.css'

function Register() {

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
    const [Email, setEmail] = useState(0);

    
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

    const  handleChangeEmail = event =>{
      if(checkVar(event.target.value)){
        setEmail(event.target.value)
      }
    }

    const RegisterUser =  ()=>{
                const bodyParameters = {
                    "username": "",
                    "password": "",
                    "email":""   
                 }
        
                 bodyParameters.username = Username
                 bodyParameters.password =  Password
                 bodyParameters.email = Email 
                
                axios.post(`http://${window.location.hostname}:3001/register`,bodyParameters).then((response)=>{

                    alert("Email Authentifizierung erforderlich!")
                    window.location.reload(false);
                 
                    }).catch(err => {
                        if(err.response.status === 500){
                            alert("Error");
                        }
                    });
}

  return (

    

<div className='Register'>
<Snackbar 
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Something went wrong!"
                action={action}
            />

<div className='Register-form'>

<div className='Picture2'></div>


<div className='Inputs-register'>
                
                Create a new account and join Soccermap!
                
                <TextField  onChange={handleChangeEmail}  id="outlined-basic" label="Email" variant="outlined" /><br></br>
                <TextField inputProps={{ maxLength: 12 }} onChange={handleChangeUsername} id="outlined-basic" label="Username" variant="outlined" /><br></br>

                <TextField onChange={handleChangePassword}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    /><br></br>


                    
                <Button onClick={()=>{
                    
                    RegisterUser()

                }} variant="contained">Create account</Button>
                
                
            </div>
        </div>
    </div>
  )
}

export default Register;

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