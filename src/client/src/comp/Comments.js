import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import Cookies  from 'js-cookie'
import '../css/comments.css'
import Comment from './Comment'



export default function Comments(props) {

const [backendComments, setBackendComments]  = useState([])
const token = Cookies.get('token')

useEffect(()=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`http://${window.location.hostname}:3001/ratings/select/${props.id}`,config).then((response)=>{
    console.log(response.data + props.id)
    setBackendComments(response.data)

    })

},[])


  return (
    <div className='comments'>
      <h2>Ratings</h2>
      <div className='comments-container'>
        {backendComments.map((comment) =>(
           
            <Comment 
           
            ratingid={comment.id}
           
            stadiumid={props.id} currentUser={props.user} key={comment.id} comment={comment}></Comment>
        ))}
        </div>  
    </div>
  )
}
