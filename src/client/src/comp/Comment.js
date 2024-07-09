import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import {Link} from "react-router-dom"
import Icon from '../image/user-icon.png'
import axios, { Axios } from 'axios'
import Avatar from '@mui/material/Avatar';

import Cookies  from 'js-cookie'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
export default function Comment(props) {
  console.log(props.currentUser)
  const canEdit = props.comment.username == props.currentUser
  const canDelete = props.comment.username == props.currentUser
  
  const [liked, setLike] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [unrated, setUnrated] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getLikes()
  }, []);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLikes = () =>{
    axios.get(`http://${window.location.hostname}:3001/rating/getNumberOfLikes/${props.ratingid}`,{
      }).then((response)=>{
        console.log("like")
        console.log(props.ratingid)
        console.log(response.data[0])
        setLikes(response.data[0])
      })
  }
  
  const handleDelete = ()=>{
  
    
    const token = Cookies.get('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    
  };

  


    
    axios.delete(`http://${window.location.hostname}:3001/ratings/delete/${props.stadiumid}`,config).then((response)=>{

        
        window.location.reload(false);

    })

  }

  const handleEdit = ()=>{

  }


  const handleLike = ()=>{

 
    setLike(true)
    setUnrated(false)
    setDislike(false)

    const token = Cookies.get('token')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
     
  };

  
  const bodyParameters = {

    "ratingid": props.ratingid
       
   }

   

    axios.post(`http://${window.location.hostname}:3001/likes/insert/`,bodyParameters, config).then((response)=>{

        
    

})



      //Set in database
    }
   

    const handleRemoveLike = ()=>{

     
      setLike(false)
      setUnrated(true)
      
      const bodyParameters = {
        "userid": props.currentUser,
        "ratingid": props.ratingid
         
     }

     
     
      axios.post(`http://${window.location.hostname}:3001/likes/delete`, bodyParameters).then((response)=>{

        
    

    })
    
  }


  const handleDislike = ()=>{

     
    setLike(false)
    setUnrated(false)
    setDislike(true)
  
}

const handleRemoveDislike = ()=>{

     
  //setLike(false)
  setUnrated(true)
  setDislike(false)

}


  return (
    <div className='comment'>
        <div className='comment-image-container'>
        <IconButton
            
            size="small"
            sx={{ ml: 2 }}
           
          >
            <Avatar alt={props.comment.username} sx={{ width: 40, height: 40}}>{props.comment.username.charAt(0)}</Avatar>
          </IconButton>
        </div>
        
        <div className='comment-right-part'>
            <div className='comment-content'>
            <div className='comment-author'>

            <Link  className='CardLink' to={`/User/${props.comment.username}`}>
              
              {props.comment.username}
              </Link></div>
            </div>
            <div className= "comment-text">
            <Box 
             
              sx={{
                '& > legend': { mt: 2 },
              }}
             
            >
              
            <Rating  name="half-rating-read" value={props.comment.gesamt} precision={0.5} readOnly /><br></br>
           
        
            </Box>
           

            
       

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
                      '& > legend': { mt: 1 },
                    }}
                  >
                  <Typography component="legend">Gesamtbewertung</Typography>
                  <Rating name="half-rating-read" value={props.comment.gesamt} precision={0.5} readOnly /><br></br>
                  <Typography component="legend">Essen</Typography>
                  <Rating name="half-rating-read" value={props.comment.essen} precision={0.5} readOnly /><br></br>
                  <Typography component="legend">Ausstattung</Typography>
                  <Rating name="half-rating-read" value={props.comment.ausstattung} precision={0.5} readOnly /><br></br>
                  <Typography component="legend">Standort</Typography>
                  <Rating name="half-rating-read" value={props.comment.standort} precision={0.5} readOnly /><br></br>

                  <Typography component="legend">Stimmung</Typography>
                  <Rating name="half-rating-read" value={props.comment.stimmung} precision={0.5} readOnly /><br></br>
               
                  <Typography component="legend">Aussicht</Typography>
                  <Rating name="half-rating-read" value={props.comment.aussicht} precision={0.5} readOnly /><br></br>
                  </Box>
            </MenuItem>
       
          </Menu>
            </div>
            <div className='comment-text'>{props.comment.message}</div>
            <IconButton onClick={handleClick}><ExpandMoreIcon></ExpandMoreIcon></IconButton>

            {unrated &&
            <div className='comment-unrated'>
              <IconButton onClick={handleLike}><ThumbUpIcon></ThumbUpIcon></IconButton> {likes.anzahl}
              
            </div>}
            { liked &&
            <div className='comment-liked'>
              <IconButton onClick={ handleRemoveLike}><ThumbUpIcon  color="primary"></ThumbUpIcon></IconButton> {likes.anzahl}
              
            </div>}
            { disliked &&
            <div className='comment-disliked'>
              <IconButton onClick={handleLike}><ThumbUpIcon ></ThumbUpIcon></IconButton>
             
            </div>}
            <div className='comment-actions'>
              {canDelete && <div onClick={handleDelete} className='comment-action'>Delete</div>}
              {/*{canEdit  && <div onClick={handleEdit} className='comment-action'>Edit</div>}*/}
            </div>
            
            
          
        </div>
       
    </div>

    
  )
}

