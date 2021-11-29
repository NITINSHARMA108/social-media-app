import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import deleteCookie from './Cookies/deleteCookie';

const Sidenav = function() {
    const navigate=useNavigate();
    const handleLogoutEvent=()=>{
        deleteCookie();
        // console.log('logout function handled')
        navigate('/signup');
    }
    return (
        <div className="side-nav">
            
            <ul>
            <h1>twit-ter</h1>
                <Link to="/" style={{textDecoration:'none',color:'white'}}><li><i className="fas fa-home" /> Home</li></Link>
                <Link to="/profile" style={{textDecoration:'none',color:'white'}}><li><i className="fas fa-user-alt" /> Profile</li></Link>
                
                <Link to="/saved" style={{textDecoration:'none',color:'white'}}><li><i className="fas fa-bookmark" /> Bookmarks</li></Link>
                <Link to="/edit" style={{textDecoration:'none',color:'white'}}><li><i className="fas fa-edit" /> Edit</li></Link>
                
                 <li onClick={()=>handleLogoutEvent()} style={{textDecoration:'none',color:'white',position:'absolute',bottom:'10px'}}>Log out</li>
            </ul>
            
        </div>
    )
}

export default Sidenav
