import React, { useEffect, useState,useCallback} from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { flexbox } from '@mui/system';
import {useNavigate} from 'react-router-dom';
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
export default function Map(props) {


  const navigate = useNavigate();
  const handleOnClick = useCallback((e) => navigate(`/Stadium/${e}`, {replace: true}), [navigate]); //Same as <Link to"...""></Link>

  const getUserStadiumData = ()=>{
    
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.get(`http://${window.location.hostname}:3001/ratings/selectbyuserinfo/${props.username}`,config).then((response)=>{
      setMarker(response.data)          
      
                                 
    });

}


  const containerStyle = {
  width: '100%',
  height: '400px',
  padding: '20px'
  

};

const center = {
  lat: 50,
  lng: 10
};


const [marker, setMarker] = useState([])

useEffect(() => {
  getUserStadiumData()
 
}, []);
      
  return (
    <div>

     
<LoadScript
        googleMapsApiKey="AIzaSyDHwbO4NbGGj1M1zugtnWylBYkQOHmLhMU"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
        >
          { /* Child components, such as markers, info windows, etc. */ 
            <div>
            {marker.map((val)=>{
              const lat = val.latitude;
              const long = val.longitude;
              
              return (
            
                 <Marker label={val.id} onClick={()=>{
                  handleOnClick(val.id)
                 }} onMouseOver={()=>{
                  
                }} icon={"http://localhost/maps/stadium.png"} title={val.name} position={{lat:lat,lng:long}}/> 
                  
              );
            })}
            </div>
          }
          <></>
        </GoogleMap>
      </LoadScript>

    </div>
  )
}
