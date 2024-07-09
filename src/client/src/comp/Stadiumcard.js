import React, {useState,useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios, { Axios } from 'axios'
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../css/Stadiumcard.css'



import {Link} from "react-router-dom"




const useStyles = makeStyles({
  root: {
    width: 345
  },
});


export default  function Stadiumcard(props) {

  const [avgRating, setavgRating] = useState(0)


  const getAverageRating = ()=>{
    axios.get(`http://${window.location.hostname}:3001/getRatingAverage/gesamt/${props.id}`).then((response)=>{
  
       setavgRating(response.data[0]["gesamt"])
          
  
        })
  }

  useLayoutEffect(() => {
    getAverageRating()
    
    }, []);
  
  

 
  
  
  const classes = useStyles();

  return (
    <div>

<Link className='CardLink' to={`/Stadium/${props.id}`}>

<Card className={classes.root}>


        
<CardMedia
  component="img"
  loading='lazy'
  height="250"
  image= {props.pic}
/>



<CardContent>
<Typography gutterBottom variant="h5" component="h2">
    {props.title}
  </Typography>
  <Typography variant="body2" color="textSecondary" component="p">
  <Rating name="half-rating-read" value={avgRating} precision={0.5} readOnly />
  <br></br>

    Land: {props.country}<br></br>
    Region: {props.region}<br></br>
    Stadt: {props.city}<br></br>
    Eröffnung: {props.opening}<br></br>
    Kapazität: {props.capacity}<br></br>
  </Typography>
</CardContent>

      
    </Card>

    </Link>  


    </div>
  )
}
