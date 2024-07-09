import React, { useEffect, useLayoutEffect, useState,useCallback} from 'react'
import '../css/maps.css'
import MapArea from '../comp/Map'
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import axios, { Axios } from 'axios';
import Cookies  from 'js-cookie'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom';
const containerStyle = {
  width: '98%',
  height: '800px',
  padding: '20px'
};

const center = {
  lat: 50,
  lng: 10
};

export default function Maps() {

  const [marker, setMarker] = useState([])
  const [average, setAverage] = useState([])
  const [selectedMarker, setSelectedMarker] = useState("");
  const navigate = useNavigate();
  const handleOnClick = useCallback((e) => navigate(`/Stadium/${e}`, {replace: true}), [navigate]); //Same as <Link to"...""></Link>
  const getPic = (id, author1, author2, author3, author4, author5) => {
    if(author1!==null && author1!==""){
      return `http://localhost/stadium/${id}_1.jpg`
    }
    else if(author2!==null && author2!==""){
      return `http://localhost/stadium/${id}_2.jpg`
    }
    else if(author3!==null && author3!==""){
      return `http://localhost/stadium/${id}_3.jpg`
    }
    else if(author4!==null && author4!==""){
      return `http://localhost/stadium/${id}_4.jpg`
    }
    else if(author5!==null && author5!==""){
      return `http://localhost/stadium/${id}_5.jpg`
    }
    return
  }
  const getMessage = (message) => {
    if(message!==null && message!==""){
      return (<p align="center">
      <h3 align="center"> Deine Rezension: </h3>
       "{message}"</p>)
    }
  }
  const getHometeam = (club, clubid, event, eventid) => {
    if(club!==null && club!==""){
      return (<p align="center">
      <b>Heimverein:</b><br></br> {club}<br></br>
      <img style={{maxHeight: "50px", maxWidth: "70px"}} src={`http://localhost/logo/${clubid}.png`}></img> 
      </p>)
    }
    else {
      return (<p align="center">
      <b>Event:</b><br></br> {event}<br></br>
      <img style={{maxHeight: "50px", maxWidth: "70px"}} src={`http://localhost/event/${eventid}.png`}></img> 
      </p>)
    }
  }
  const getGraph = (data, pers) => {
    let avg
    console.log("called")
    if(pers === true){
      avg = (data.aussicht+data.ausstattung+data.essen+data.standort+data.stimmung)/5
    }
    else if (pers === false){
      avg = average[data.id][0].gesamt
    }
    
    let stars = []
    for(let i = 1; i<=5; i++){
      if(avg>=0.95){
        stars.push(<img width="30px" src="http://localhost/maps/SoccerballSmall.png"></img>)
        avg--
      }
      else if(avg<0.95 && avg>0.05){
        if(avg>=0.05&&avg<0.15){
          stars.push(<img width="30px" src="http://localhost/maps/1SoccerballSmall.png"></img>)
        }
        else if(avg>=0.15&&avg<0.25){
          stars.push(<img width="30px" src="http://localhost/maps/2SoccerballSmall.png"></img>)
        }
        else if(avg>=0.25&&avg<0.35){
          stars.push(<img width="30px" src="http://localhost/maps/3SoccerballSmall.png"></img>)
        }
        else if(avg>=0.35&&avg<0.45){
          stars.push(<img width="30px" src="http://localhost/maps/4SoccerballSmall.png"></img>)
        }
        else if(avg>=0.45&&avg<0.55){
          stars.push(<img width="30px" src="http://localhost/maps/5SoccerballSmall.png"></img>)
        }
        else if(avg>=0.55&&avg<0.65){
          stars.push(<img width="30px" src="http://localhost/maps/6SoccerballSmall.png"></img>)
        }
        else if(avg>=0.65&&avg<0.75){
          stars.push(<img width="30px" src="http://localhost/maps/7SoccerballSmall.png"></img>)
        }
        else if(avg>=0.75&&avg<0.85){
          stars.push(<img width="30px" src="http://localhost/maps/8SoccerballSmall.png"></img>)
        }
        else if(avg>=0.85&&avg<0.95){
          stars.push(<img width="30px" src="http://localhost/maps/9SoccerballSmall.png"></img>)
        }
        avg--
      }
      else{
        stars.push(<img width="30px" src="http://localhost/maps/0SoccerballSmall.png"></img>)
      }
    }
		return (
      <p align="center">
        {stars[0]}{stars[1]}{stars[2]}{stars[3]}{stars[4]}
      </p>
    );
  }

  useLayoutEffect(() => {
    let averages = []
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`http://${window.location.hostname}:3001/ratings/selectbyuser/`,config).then((response)=>{
      setMarker(response.data)         

      response.data.map((data) =>{
        axios.get(`http://${window.location.hostname}:3001/getRatingAverage/gesamt/${data.id}`).then((response)=>{
          averages[data.id] = response.data
        });
      })
      setAverage(averages)
    });

    
  
  }, []);
    return (

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
            {marker.map((markerdata)=>{
              return (
            
                <Marker 
                label={markerdata.id} 
                onClick={()=>{handleOnClick(markerdata.id)}} 
                onMouseOver={()=>{setSelectedMarker(markerdata)}} 
                icon={"http://localhost/maps/stadium.png"} 
                title={markerdata.name} 
                position={{lat:markerdata.latitude, lng:markerdata.longitude}}/> 
                  
              );
            })}
            </div>
          }
          <></>
          {selectedMarker ? (
            <InfoWindow
              position={{lat:selectedMarker.latitude,lng:selectedMarker.longitude}}
              options={{
                pixelOffset: new window.google.maps.Size(0, -40),
              }}
              onCloseClick={()=>{setSelectedMarker(null)}}
            >
              <div>
                <img src={getPic(selectedMarker.id, selectedMarker.author1, selectedMarker.author2, selectedMarker.author3, selectedMarker.author4, selectedMarker.author5)} width="300px" height="auto"></img>
                <p align="center" style={{"font-size": "9px"}}> {getAttribution(selectedMarker.author1, selectedMarker.license1, selectedMarker.plink1, selectedMarker.alink1, selectedMarker.llink1)} </p>
                <h2 align="center">{selectedMarker.name}</h2>
                <p align="center"> {selectedMarker.country}, {selectedMarker.region}, {selectedMarker.city}</p>
                {getHometeam(selectedMarker.club, selectedMarker.clubid, selectedMarker.event, selectedMarker.eventid)}
                {getMessage(selectedMarker.message)}
                <h3 align="center"> Deine Gesamtbewertung: </h3>
                {getGraph(selectedMarker, true)}
                <h3 align="center"> Durchschn. Gesamtbewertung:</h3>
                {getGraph(selectedMarker, false)}
              </div>
            </InfoWindow>
          ): null}
        </GoogleMap>
      </LoadScript>
    ) 
}

function getAttribution(author1, license1, plink1, alink1, llink1){
  if(author1?.length!==0){
    if(author1 === "public domain"){
      return
    }
    else{
      if(alink1?.length!==0){
        return (
          <div>
          <a href={plink1} target="_blank">Picture</a> by <a href={alink1} target="_blank">{author1}</a> under <a href={llink1} target="_blank">{license1}</a>
          </div>
        )
      }
      else{
        return(
          <div>
          <a href={plink1} target="_blank">Picture</a> by {author1} under <a href={llink1} target="_blank">{license1}</a>
          </div>
        ) 
      }        
    }
  }
}