import React,{useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
import Button from '@mui/material/Button';
import '../css/BasicTabs.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 10 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};




function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {


  const [value, setValue] = React.useState(0);
  const [clubs, setClubs]  =  React.useState([])
  const [club, setClub] = React.useState('');

  const [stadium, setStadium] = useState('')
  const [stadiums, setStadiums] = useState([])
 
  const getClubs = ()=>{
    axios.get(`http://${window.location.hostname}:3001/clubs/select/`).then((response)=>{
      setClubs(response.data)
  
    
    })
}


const getStadiums = ()=>{
  axios.get(`http://${window.location.hostname}:3001/stadiums/select/`).then((response)=>{
    setStadiums(response.data)
    
  
  })
}



const updateClub = ()=>{
  const token = Cookies.get('token')

  const config = {
    headers: { 
      Authorization: `Bearer ${token}` 
  }
};
  axios.get(`http://${window.location.hostname}:3001/users/update/favclub/${club}`,config).then((response)=>{

      console.log(response.data)
  })
}


const updateStadium = ()=>{
  const token = Cookies.get('token')
  
  const config = {
    headers: { 
      Authorization: `Bearer ${token}` 
  }
};
  axios.get(`http://${window.location.hostname}:3001/users/update/favstadium/${stadium}`,config).then((response)=>{

      console.log(response.data)
  })
}

  useEffect(() => {
    getClubs()
    getStadiums()
  }, []);


    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeClub = (event) => {
    
    setClub(event.target.value);
    
  };

  const handleChangeStadium = (event) => {
    
    setStadium(event.target.value);
    console.log(stadium)
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab  label="Favourites" {...a11yProps(0)} />
          <Tab label="Account" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel    value={value} index={0}>
      <div ></div>
      <Box  sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Club</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={club}
          label="Club"
          onChange={handleChangeClub}
        >
          {clubs.map((anObjectMapped, index) => {
      return ( 
        <MenuItem value={anObjectMapped.id}>{anObjectMapped.name}</MenuItem>
      );
  })} 

  



        </Select>
      </FormControl>
    </Box>
      

        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Stadium</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stadium}
          label="Stadium"
          onChange={handleChangeStadium}
        >
          {stadiums.map((anObjectMapped, index) => {
            
      return ( 
        <MenuItem value={anObjectMapped.id}>{anObjectMapped.name}</MenuItem>
      );
  })} 

  
        


        </Select>
      </FormControl>
    </Box>

<Button onClick={(e)=>{

updateClub();
updateStadium()


}} variant="contained">Save</Button>

        
      </TabPanel>
      <TabPanel value={value} index={1}>
     
    <br></br>

    <Box sx={{'& > legend': { mt: 2 },}}>
      
   
    <Button onClick={()=>{
      // Send email link to reset passwort
    }}>Passwort zurücksetzen</Button>

    </Box>
      
        
      </TabPanel>
      
    </Box>
  );
}