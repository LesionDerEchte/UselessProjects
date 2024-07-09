
import React,{useState,useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import '../css/User.css'
import Stadiumcard from '../comp/Stadiumcard'
import Icon from '../image/male.svg';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
import {Link} from "react-router-dom"
import Map from '../comp/Map';
export default function User() {



  const checkIsFollowing = ()=>{
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  
  const  bodyParameters= {
    "followingid": params.username
 }

  axios.get(`http://${window.location.hostname}:3001/following/check`,bodyParameters, config).then((response)=>{
    console.log("--")
    console.log(response.data)
    // If data set = Result set to true
  })
    
  }

  const getLikes = () =>{
    axios.get(`http://${window.location.hostname}:3001/getNumberOfLikes/${params.username}`,{
      }).then((response)=>{
        setLikes(response.data[0])
      })
  }

  const getLiked = () =>{
axios.get(`http://${window.location.hostname}:3001/getNumberOfLiked/${params.username}`,{
  }).then((response)=>{
    setLiked(response.data[0])
  })
}

  const getRatings = () =>{
    axios.get(`http://${window.location.hostname}:3001/getNumberOfRatings/${params.username}`,{
      }).then((response)=>{
        setRatings(response.data[0])
      })
  }

  const getFavorite = () =>{
    axios.get(`http://${window.location.hostname}:3001/getFavoriteRating/${params.username}`, {
      }).then((response)=>{
        console.log("fav")
        console.log(response.data[0])
        if(response.data[0]==undefined){
          setFavorite("none")
        }
        else{setFavorite(response.data[0])
        }
        
      })
  }


  const handleFollow = ()=>{

      

    setIsFollowing(true)
      const token = Cookies.get('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
      "followingid": params.username
         
   }

     
      axios.post(`http://${window.location.hostname}:3001/following/insert/`, bodyParameters ,config).then((response)=>{
    
     
    
          }).catch(err => {
              
              if(err.response.status === 500){
                  alert("Kann sich nicht selbst folgen")
                  setIsFollowing(false)
                 
              }

              
             
          })
  
  }

  const handleUnfollow = ()=>{
    setIsFollowing(false)
    // Delete entry from database
  }

  

  const getUserData = ()=>{
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  axios.get(`http://${window.location.hostname}:3001/users/select/${params.username}`,config).then((response)=>{

    setUserdata(response.data[0])

  })
  }

  

  useEffect(() => {
    getUserData()
    checkIsFollowing()
    getLikes()
    getLiked()
    getRatings()
    getFavorite()
  }, []);


    const params = useParams();
    const [userdata, setUserdata] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false)
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState([])
    const [ratings, setRatings] = useState([])
    const [favorite, setFavorite] = useState([])

   

  return (

    <div className='User-backround'>
    <div className='User-container'>
      
    <div className='User-Userinfo'>
      
      <div className='User-ProfilePic'><img src={Icon}></img>
      <h2>{params.username}</h2>
      {isFollowing ||
      <Button onClick={handleFollow} variant="outlined">Follow</Button>
      }

      {isFollowing &&
      <Button onClick={handleUnfollow} variant="outlined">UnFollow</Button>
      }

        <div className='User-First'>
        Bewertungen: {ratings.anzahl}</div></div>
        <div className='User-Userdata'>
        <div>Likes verteilt: {liked.anzahl}</div> 
        <div>Likes erhalten: {likes.anzahl}</div>
        </div>
        
        <div className='User-TopBewertung'>
          <h3>Beliebteste Bewertung</h3>
        	{checkFav(favorite)}
      </div>
    </div>
    <div className='User-Stadium-Club-info'>

    
        <div className='User-Clubinfo'>
          {checkStadium(userdata.stadium)}
         </div>
         
          <div className='User-stadiuminfo'>
           {checkClub(userdata.club)}
           
            
</div>


    </div>

    


    </div>

    

    

    <div className='User-Map'>
      <Map username={params.username}></Map>

    </div>

    <div className='User-Source'>
    <a href="https://www.vecteezy.com/free-vector/website-background">Website Background Vectors by Vecteezy</a>
    </div>

    </div>
  )
}

function checkStadium(stadium){
  if(stadium != null && stadium != ""){
    return stadium
  }
  return "Kein Lieblingsstadion"
}

function checkClub(club){
  if(club != null && club != ""){
    return club
  }
  return "Kein Lieblingsclub"
}

function checkFav(favorite){
  if(favorite=="none"){
    return "Noch keine Review."
  }
  else if(favorite.message != null && favorite.message != ""){
    return (<div><b>Stadion:</b> {favorite.stadium} <br></br>
            <b>Gesamtbewertung:</b> {checkRating(favorite.gesamt)} <br></br>
            <b>Rezension:</b> "{favorite.message}" <br></br>
            <b>{checkLike(favorite.anzahl)}:</b> {favorite.anzahl} </div>)
  }
  else {
    return (<div><b>Stadion:</b> {favorite.stadium} <br></br>
            <b>Gesamtbewertung:</b> {checkRating(favorite.gesamt)} <br></br>
            <b>Rezension:</b> Ohne Text <br></br>
            <b>{checkLike(favorite.anzahl)}:</b> {favorite.anzahl} </div>)
  }
}

function checkLike(anzahl){
  if(anzahl == 1){
    return "Like"
  }
  else{
    return "Likes"
  }
}

function checkRating(rating){
  if(rating == 0){
    return "ohne Bewertung"
  }
  else{
    return rating
  }
}