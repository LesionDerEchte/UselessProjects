import '../css/start.css'
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import Paper from '@mui/material/Paper';

function Start(){
    return(
        <div className="Start">
            <div className='Headline'>
           
            
        
            
                <div >
               
                <h1>Welcome to Soccermap</h1>
                <Link to="/Stadium">      
                <Button variant="contained">Get Started</Button>
                </Link>  
                </div>
           
    
                    
              
               
                </div>
                
                
          
        </div>
    )
}

export default Start;