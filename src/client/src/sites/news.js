
import '../css/news.css'
import Box from '@mui/material/Box';
    import Card from '@mui/material/Card';
    import CardActions from '@mui/material/CardActions';
    import CardContent from '@mui/material/CardContent';
    import Button from '@mui/material/Button';
    import Typography from '@mui/material/Typography';
    import React,{useState,useEffect } from 'react';
    import axios, { Axios } from 'axios'
    import Cookies  from 'js-cookie'

function News(){


  const [Post, setPost] = useState();

  
  useEffect(() => {
    getPosts()
  }, []);


  const getPosts = ()=>{
    const token = Cookies.get('token')
    console.log(token)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get("http://localhost:3001/posts",config).then((response)=>{

    console.log(response.data)
    setPost(response.data[0].title)
    })
}


    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );
    
    const card = (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Post of the day
          </Typography>
          <Typography variant="h5" component="div">
          {Post}
          </Typography>
          
          
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    );



    return(
        <div className="news">
            <div className='content'>
            <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
            </Box></div>
            
        </div>
    )
}

export default News;