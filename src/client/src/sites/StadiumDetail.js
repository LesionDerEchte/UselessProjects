import React, {useState,useEffect, useLayoutEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../css/StadiumDetail.css'
import Comments from '../comp/Comments';
import Divider from '@mui/material/Divider';
import CommentForm from '../comp/CommentForm';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Snackbar from '@mui/material/Snackbar';
import { getTableSortLabelUtilityClass } from '@mui/material';
import Slider from '../comp/Slider';
import RatingDialog from '../comp/RatingDialog';


export default function StadiumDetail() {



 
  


  const getStadium = ()=>{
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}`,
      bodyParameters: { } }
    };
    axios.get(`http://${window.location.hostname}:3001/stadiums/select/${params.id}`,config).then((response)=>{
    
    setstadiumData(response.data)
    setSpinner(false)
    })
    
}
         
const [text, setText] = useState("")
const [avgRating, setavgRating] = useState(0)
const [amtRating, setamtRating] = useState(0)
const [rating, setRating] = useState(0)
const [stadiumid, setstadiumid] = useState(0)
const params = useParams();


const getAverageRating = ()=>{
  axios.get(`http://${window.location.hostname}:3001/getRatingAverage/gesamt/${params.id}`).then((response)=>{

     setavgRating(response.data[0]["gesamt"])
        

      })
}

const getRatingAmount = ()=>{
  axios.get(`http://${window.location.hostname}:3001/getRatingAmount/gesamt/${params.id}`).then((response)=>{

     setamtRating(response.data[0]["anzahl"])
        

      })
}

const handleSubmit = ()=>{

  const token = Cookies.get('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`http://${window.location.hostname}:3001/ratings/user/${params.id}`,config).then((response)=>{
      console.log(response.data.length)
      if(response.data.length == 0){
        const bodyParameters = {
          "userid": null,
          "stadiumid": null,
          "typeid": 1,
          "rating": null,
          "message": null   
       }
      
       bodyParameters.userid = Name
       bodyParameters.stadiumid = stadiumid
       bodyParameters.rating = rating
       bodyParameters.message = text
      
       
      
      axios.post(`http://${window.location.hostname}:3001/ratings/insert/`,bodyParameters).then((response)=>{
      
              console.log(response)
              window.location.reload(false);
      
          })

      }

      else{
       handleClick();

      }



      
    })
  
}


  const [spinner, setSpinner] = useState(false);   

  const [stadiumData, setstadiumData] = useState(["hello"]);   
  const location = useLocation();
  
  const token = Cookies.get('token')
  const [Name, setName] = useState();

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

  useLayoutEffect(() => {




    setSpinner(true)
    setstadiumid(params.id)
    getAverageRating()
    getRatingAmount()
    getStadium();

   
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`http://${window.location.hostname}:3001/profile`,config).then((response)=>{
        setName(response.data)
        })

        
   
    }, []);
  
  return (
    <div className='StadiumDetail'>

<Snackbar 
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Bereits bewertet!"
                action={action}
            />

        
      
      
      {spinner ?   <div className='Spinner'><Box sx={{ display: 'flex' }}>
    <CircularProgress /> 
     </Box></div>

: 
      
      
      <div className='StadiumDetailArea'>

            <Slider id={stadiumData[0].id} attributionData={stadiumData[0]}></Slider>
        
{ //       <img className='Stadium-gallery' src={getLink(stadiumData[0].id, stadiumData[0].author1, stadiumData[0].author2, stadiumData[0].author3, stadiumData[0].author4, stadiumData[0].author5)}></img>
}
        



         
       
        <div className='Stadium-Detail-Textarea'>

          <div className='Stadium-Detail-Mainarea'>

          <div className='Stadium-Detail-Mainarea-title'>
          {stadiumData[0].name}
          </div>
          
          <div className='Stadium-Detail-Mainarea-footer'>
          <div>{getOpen(stadiumData[0].closed, stadiumData[0].demolished)}</div>
            <div> <Rating  size="large" name="half-rating-read" value={avgRating} precision={0.5} readOnly /></div>
            <div> Bewertungen: {amtRating}</div>
          </div>

          <div className='Stadium-Detail-Mainarea-content'>
          <table>
            {getOwner(stadiumData[0].clubname, stadiumData[0].eventname)}
            <tr>
              <th width="500px" align="right">Land:</th>
              <td width="10px"></td>
              <td width="500px" align="left">{stadiumData[0].country}</td>
            </tr>
            <tr>
              <th align="right">Region:</th>
              <td></td>
              <td align="left">{stadiumData[0].region}</td>
            </tr>
            <tr>
              <th align="right">Stadt:</th>
              <td></td>
              <td align="left">{stadiumData[0].city}</td>
            </tr>
            <tr>
              <th align="right">Eröffnung:</th>
              <td></td>
              <td align="left">{stadiumData[0].opening}</td>
            </tr>
            <tr>
              <th align="right">Kapazität:</th>
              <td></td>
              <td align="left">{stadiumData[0].capacity}</td>
            </tr>
          </table>
          </div>




          </div>


          
          <div className='Stadium-Deatil-Home-club'><img src={getLogo(stadiumData[0].clubid, stadiumData[0].eventid)}></img><br></br>
          
          </div>
        </div>

        
          
          
      </div>

      
    
}




<div className='StadiumDetail-divider'>
<Divider></Divider>
</div>
<div className='StadiumDetail-comment-form'>


<RatingDialog stadiumid={stadiumid} userid={Name}></RatingDialog>


</div>


<div className='StadiumDetail-comment-section'>



<Comments id={params.id} user={Name}></Comments>
</div>  
    </div>
  )
}

function getOpen(closed, demolished){
  if(closed?.length!==0){
    if(demolished?.length!==0){
      return <div style={{color:"darkred"}}>{closed} geschlossen, {demolished} abgerissen</div>
    }
    else{
      return <div style={{color:"red"}}>{closed} geschlossen</div>
    }
  }
  else{
    return <div style={{color:"green"}}>geöffnet</div>
  }
}

function getLogo(clubid, eventid){
  if(clubid==null){
    return `http://${window.location.hostname}/event/${eventid}.png`
  }
  else{
    return `http://${window.location.hostname}/logo/${clubid}.png`
  }
  
}

function getOwner(club, eventname){
  if(club==null){
    return (<tr><th align="right">Event:</th><td></td><td align="left">{eventname}</td></tr>)
  }
  else{
    return (<tr><th align="right">Heimverein:</th><td></td><td align="left">{club}</td></tr>)
  }
}