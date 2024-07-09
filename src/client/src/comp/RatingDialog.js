import axios, { Axios } from 'axios'

import React, {useState,useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Cookies  from 'js-cookie'
import Snackbar from '@mui/material/Snackbar';


function SimpleDialog(props) {


    const [stimmung, setStimmung] = useState(0)
    const [ausstattung, setAusstattung] = useState(0)
    const [essen, setEssen] = useState(0)
    const [standort, setStandort] = useState(0)
    const [aussicht, setAussicht] = useState(0)
    const [text, setText] = useState("")
    const token = Cookies.get('token')

    
   
    
    const handleRate = ()=>{
        

        const config = {
            headers: { Authorization: `Bearer ${token}` }
           
        };
    
        
        const bodyParameters = {
            "stadiumid": props.stadiumid,
                "stimmung" : stimmung,
                "standort" : standort,
                "ausstattung": ausstattung,
                "essen": essen,
                "aussicht": aussicht,
                "message": text
             
         }
        
        
         
        
        axios.post(`http://${window.location.hostname}:3001/ratings/insert/`,bodyParameters,config).then((response)=>{
    
        
        window.location.reload(false);
        
       
            }).catch(err => {
                
                if(err.response.status === 400){
                  props.setOpensnack(true)
                   

                }
               
            })
  
  }

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog PaperProps={{ sx: { padding: '20px' } }}className='Rating-Dialog' onClose={handleClose} open={open}>
      <DialogTitle>Bewerte ein Stadion!</DialogTitle>
      <Box display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Typography component="legend">Essen</Typography>
      </Box>
      
      <Rating className='StadiumDetail-rating'
        name="half-rating"
       
        precision={0.5}
        size="large"
        value={essen}
        onChange={(event, newValue) => {
          setEssen(newValue)
        }}
        
      />
       <Box display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Typography component="legend">Aussicht</Typography>
      </Box>
<Rating className='StadiumDetail-rating'
        name="half-rating"
        precision={0.5}
        size="large"
        value={aussicht}
        onChange={(event, newValue) => {
          setAussicht(newValue)
        }}
        
      />
 <Box display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Typography component="legend">Ausstattung</Typography>
      </Box>
<Rating className='StadiumDetail-rating'
       
        name="half-rating"
        precision={0.5}
        size="large"
        value={ausstattung}
        onChange={(event, newValue) => {
          setAusstattung(newValue)
        }}
        
      />
 <Box display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Typography component="legend">Standort</Typography>
      </Box>
<Rating className='StadiumDetail-rating'
        name="half-rating"
        precision={0.5}
        size="large"
        value={standort}
        onChange={(event, newValue) => {
          setStandort(newValue)
        }}
        
      />
 <Box display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Typography component="legend">Stimmung</Typography>
      </Box>
<Rating className='StadiumDetail-rating'
        name="half-rating"
        precision={0.5}
        size="large"
        value={stimmung}
        onChange={(event, newValue) => {
          setStimmung(newValue)
        }}
        
      />

<TextareaAutosize
  onChange={(e)=>{
    if(checkVar(e.target.value)){
      setText(e.target.value)
    }
  }}
  maxRows={4}
  aria-label="maximum height"
  placeholder="Write a comment"
  
  style={{ width: '400px', height: '200px' }}
/>

<Button onClick={()=>{
handleRate()
}} variant="contained">Bewerten</Button>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function RatingDialog(props) {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
  };

  const [openSnack, setOpensnack] = React.useState(false);

    const handleClick = () => {
      setOpensnack(true);
    };

    
  
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpensnack(false);
    };

    const action = (
        <React.Fragment>
          <Button color="error" size="small" onClick={handleSnackClose}>
            Close
          </Button>
          
          
        </React.Fragment>
      );

  return (
    <div>

      <Button variant="outlined" onClick={handleClickOpen}>
        Bewerten
      </Button>
      <SimpleDialog
        setOpensnack = {setOpensnack}
        stadiumid={props.stadiumid}
        userid={props.userid}
        
        open={open}
        onClose={handleClose}
      />

    <Snackbar 
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Bereits bewertet"
                action={action}
            />
    </div>
  );
}

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