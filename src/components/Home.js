import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Sidenav from './Sidenav'
import Feed from './Feed';
import Right from './Right';
import checkCookie from './Cookies/checkCookie';
 // import Sidenav from './Sidenav';

const Home = function() {
    const navigate=useNavigate();
    // document.querySelector('.side-nav').style.display='flex';
    // document.querySelector('.right-side').style.display='flex';
    const [flag,setflag]=useState(false);
    
    useEffect(() => {
        if(!checkCookie())
        {
        navigate('/signup');
        
        
        }
        else{

        setflag(true);
        }
    }, [])
    return (
        
       flag?
       <>          
            <Sidenav />
           <Feed />
           <Right />
           
          
        </>:
        <p />

    )
}

export default Home
