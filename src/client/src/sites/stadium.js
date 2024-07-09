import React, {useState,useEffect, useLayoutEffect } from 'react';
import Stadiumcard from '../comp/Stadiumcard'
import Button from '@mui/material/Button';
import '../css/stadium.css'
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';

export default function Stadium() {

    const [Stadiums, setStadiums] = useState([]);
    const [spinner, setSpinner] = useState(false); 
    const [searchfielddata, setSearchfielddata] = useState("")
    const [search, setSearch] = useState(false)
    const [searchData, setSearchData] = useState([])  

    const [country, setCountry] = useState("all")
    const [region, setRegion] = useState("all")
    const [city, setCity] = useState("all")
    const [order, setOrder] = useState("name")
    const [direction, setDirection] = useState("ASC")
    const [capacityFrom, setCapacityFrom] = useState(null)
    const [capacityTo, setCapacityTo] = useState(null)
    const [openingFrom, setOpeningFrom] = useState(null)
    const [openingTo, setOpeningTo] = useState(null)
    const [visited, setVisited] = useState("all")
    
    const [availableCountries, setAvailableCountries] = useState([])
    const [availableRegions, setAvailableRegions] = useState([])
    const [availableCities, setAvailableCities] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    useEffect(() => {
      getStadiums();
      getCities();
      getRegions();
    }, [country])

    useEffect(() => {
      getStadiums();
      getCities();
      getCountries();
    }, [region])

    useEffect(() => {
      getStadiums();
      getCountries();
      getRegions();
    }, [city])

    useEffect(() => {
      getStadiums();
    }, [order])

    useEffect(() => {
      getStadiums();
    }, [direction])

    useEffect(() => {
      getStadiums();
    }, [capacityFrom])

    useEffect(() => {
      getStadiums();
    }, [capacityTo])

    useEffect(() => {
      getStadiums();
    }, [openingFrom])

    useEffect(() => {
      getStadiums();
    }, [openingTo])

    useEffect(() => {
      getStadiums();
    }, [visited])

    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    }

    const handleRegionChange = (event) => {
      setRegion(event.target.value);
    }

    const handleCityChange = (event) => {
      setCity(event.target.value);
    }

    const handleOrderChange = (event) => {
      setOrder(event.target.value);
    }

    const handleDirectionChange = (event) => {
      setDirection(event.target.value);
    }

    const handleCapacityFromChange = (event) => {
      if(event.target.value===""){
        setCapacityFrom(0);
      }
      else{
        if(checkVar(event.target.value)==true){
          setCapacityFrom(event.target.value);
        }
        
      }
      
    }
    
    const handleCapacityToChange = (event) => {
      if(event.target.value===""){
        setCapacityTo(9999999);
      }
      else{
        if(checkVar(event.target.value)==true){
          setCapacityTo(event.target.value);
        }
      }
    }

    const handleOpeningFromChange = (event) => {
      if(event.target.value===""){
        setOpeningFrom(0);
      }
      else{
        if(checkVar(event.target.value)==true){
          setOpeningFrom(event.target.value);
        }
        
      }
      
    }
    
    const handleOpeningToChange = (event) => {
      if(event.target.value===""){
        setOpeningTo(9999999);
      }
      else{
        if(checkVar(event.target.value)==true){
          setOpeningTo(event.target.value);
        }
        
      }
    }

    const handleVisitedChange = (event) => {
      setVisited(event.target.value);
    }

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'black',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '24ch',
          '&:focus': {
            width: '48ch',
          },
        },
      },
    }));
    
    const getCountries = () =>{
      axios.post(`http://${window.location.hostname}:3001/countries/selectdefinite/`, {
            region: region,
            city: city
        }).then((response)=>{
          setAvailableCountries(response.data)
        })
    }

    const getRegions = () =>{
      axios.post(`http://${window.location.hostname}:3001/regions/selectdefinite/`, {
            country: country,
            city: city
        }).then((response)=>{
          setAvailableRegions(response.data)
          console.log("Regions")
          console.log(response.data)
        })

    }

    const getCities = () =>{
      axios.post(`http://${window.location.hostname}:3001/cities/selectdefinite/`, {
            country: country,
            region: region
        }).then((response)=>{
          setAvailableCities(response.data)
        })
    }

    const getStadiums = () =>{
      console.log("got response " + country)
        const token = Cookies.get('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

     const handleKeyPress = (event) => {
          if(event.key === 'Enter'){
            axios.get(`http://${window.location.hostname}:3001/stadiums/select/search/${searchfielddata}`).then((response)=>{
            
            if(event.target.value != null){
              setSearch(true)
            }
            else{
             setSearch(false)
            }
             
             console.log(response.data)
             setSearchData(response.data)
             })
          }
      }
        axios.post(`http://${window.location.hostname}:3001/stadiums/filter`, {
            country: country,
            region: region,
            city: city,
            openingMax: openingTo,
            openingMin: openingFrom,
            capacityMax: capacityTo,
            capacityMin: capacityFrom,
            visited: visited,
            order: order,
            direction: direction
        }, config).then((response)=>{
          console.log(response.data)
          setSearchData(response.data)
          setSearch(true)
          setSpinner(false)
          })

      /*  axios.get("http://localhost:3001/stadiums/select",config).then((response)=>{
        setStadiums(response.data)
        console.log(response.data)
        setSpinner(false)
        })*/
    }

    useLayoutEffect(() => {
      setSpinner(true)
      getStadiums();
      getCountries();
      getRegions();
      getCities();
      console.log("Countries called")
      console.log(Stadiums)
      }, []);


  return (
      <div className='stadium-container'>

      


<Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onMouseLeave={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
                >
            <MenuItem>
                  <Box
                    sx={{
                      '& > legend': { mt: 2 }, display: "flex", justifyContent: "center", flexDirection:"column"
                    }}
                  >
                  {/*  All FILTER ITEMS*/}


                     
                            <InputLabel id="country-select-label">Land</InputLabel>
                            <Select
                              labelId="country-select-label"
                              id="country-select"
                              value={country}
                              label="Country"
                              onChange={handleCountryChange}
                            >
                              <MenuItem value={"all"}><em>Alle</em></MenuItem>
                              {availableCountries.map((value) => (
                                <MenuItem value={value.country}>{value.country}</MenuItem>
                              ))}
                            </Select>
                  
                  {/*  Region*/}
                  
                      <InputLabel id="region-select-label">Region</InputLabel>
                      <Select
                        labelId="region-select-label"
                        id="region-select"
                        value={region}
                        label="Region"
                        onChange={handleRegionChange}
                      >
                        <MenuItem value={"all"}><em>Alle</em></MenuItem>
                        {availableRegions.map((value) => (
                          <MenuItem value={value.region}>{value.region}</MenuItem>
                        ))}
                      </Select>
                  
                 

                   {/*  City*/}
              <InputLabel id="city-select-label">Stadt</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={city}
                label="Region"
                onChange={handleCityChange}
              >
                <MenuItem value={"all"}><em>Alle</em></MenuItem>
                {availableCities.map((value) => (
                  <MenuItem value={value.city}>{value.city}</MenuItem>
                ))}
              </Select>

               {/*  Sorting  */}


              
               
                    <InputLabel id="order-select-label">Sortieren nach</InputLabel>
                    <Select
                      labelId="order-select-label"
                      id="order-select"
                      value={order}
                      label="Order"
                      onChange={handleOrderChange}
                    >
                      <MenuItem value="opening">Eröffnungsjahr</MenuItem>
                      <MenuItem value="capacity">Kapazität</MenuItem>
                      <MenuItem value="country">Land</MenuItem>
                      <MenuItem value="region">Region</MenuItem>
                      <MenuItem value="name">Stadionname</MenuItem>
                      <MenuItem value="city">Stadt</MenuItem>
                    </Select>
             


                {/*  Auf Absteigend */}

                
                    <InputLabel id="direction-select-label">Auf-/Absteigend</InputLabel>
                  <Select
                    labelId="direction-select-label"
                    id="direction-select"
                    value={direction}
                    label="Direction"
                    onChange={handleDirectionChange}
                  >
                    <MenuItem value="DESC">Absteigend</MenuItem>
                    <MenuItem value="ASC">Aufsteigend</MenuItem>
                  </Select>
                

                
                
                
              
              <InputLabel id="direction-select-label">Kapazität von</InputLabel>
              <TextField
                id="capacity-from"
                type="number"
                onChange={handleCapacityFromChange}
              />
              <InputLabel id="direction-select-label">bis</InputLabel>
              <TextField
                id="capacity-to"
                type="number"
                onChange={handleCapacityToChange}
              />
            
              <InputLabel id="direction-select-label">  Eröffnungsjahr von</InputLabel>
              <TextField
                id="opening-from"
                type="number"
                onChange={handleOpeningFromChange}
              />
              <InputLabel id="direction-select-label"> bis</InputLabel>

              <TextField
                id="opening-to"
                type="number"
                onChange={handleOpeningToChange}
              />
              <InputLabel id="visited-select-label">Besucht Ja/Nein</InputLabel>
              <Select
                labelId="visited-select-label"
                id="visited-select"
                value={visited}
                label="Visited"
                onChange={handleVisitedChange}
              >
                <MenuItem value="all"><em>Alle</em></MenuItem>
                <MenuItem value="yes">Ja</MenuItem>
                <MenuItem value="no">Nein</MenuItem>
              </Select>
                
                

                  </Box>
            </MenuItem>
       
          </Menu>

             

              
              
             
              

<div className='stadium-searchfield'>
            <Search onKeyDown={(event)=>{
              if (event.key == "Enter") {
                if(checkVar(event.target.value)){
                axios.get(`http://${window.location.hostname}:3001/stadiums/select/search/${event.target.value}`).then((response)=>{

                if(event.target.value != null){
                   setSearch(true)
                }
                else{
                 setSearch(false)
                }
                
                setSearchData(response.data)
            
                 
                 })
              }
            }}}>
            

            
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </div>   

      <Button onClick={handleClick} variant="text">Filter</Button>


  
    <div className='stadium'> 
    
    {search ? 
     searchData.map((anObjectMapped, index) => {
      return ( 
        <Stadiumcard id={anObjectMapped.id} capacity={anObjectMapped.capacity} opening={anObjectMapped.opening} city={anObjectMapped.city} region={anObjectMapped.region} country={anObjectMapped.country} title= {anObjectMapped.name} pic={getLink(anObjectMapped.id, anObjectMapped.author1, anObjectMapped.author2, anObjectMapped.author3, anObjectMapped.author4, anObjectMapped.author5)}></Stadiumcard>
        
      );
  })

    

      /*
    spinner ?   <div className='Spinner'><Box sx={{ display: 'flex' }}>
    <CircularProgress /> 
     </Box></div>*/

     

: 



      //Wenn Searchfield leer display alles, wenn wert drin dann fetch von api und durchgehen des gefilterten Arrays
      
    
    Stadiums.map((anObjectMapped, index) => {
    return ( 
      <Stadiumcard id={anObjectMapped.id} capacity={anObjectMapped.capacity} opening={anObjectMapped.opening} city={anObjectMapped.city} region={anObjectMapped.region} country={anObjectMapped.country} title= {anObjectMapped.name} pic={getLink(anObjectMapped.id, anObjectMapped.author1, anObjectMapped.author2, anObjectMapped.author3, anObjectMapped.author4, anObjectMapped.author5)}></Stadiumcard>

    );
})}

</div>

</div>
  )
}

function getLink(id, author1, author2, author3, author4, author5){
  if(author1?.length!==0){
    return `http://${window.location.hostname}/stadium/` + id + '_1.jpg'
  }
  else if(author2?.length!==0){
    return `http://${window.location.hostname}/stadium/` + id + '_2.jpg'
  }
  else if(author3?.length!==0){
    return `http://${window.location.hostname}/stadium/` + id + '_3.jpg'
  }
  else if(author4?.length!==0){
    return `http://${window.location.hostname}/stadium/` + id + '_4.jpg'
  }
  else if(author5?.length!==0){
    return `http://${window.location.hostname}/stadium/` + id + '_5.jpg'
  }
  else{
    return `http://${window.location.hostname}/NoImage.jpg`
  }
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