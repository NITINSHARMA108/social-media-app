import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addFollower,addFollowing, removeFollower, removeFollowing } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';

const Usercard = function({user}) {
    const x=getCookie();
    const addtoFollowingAndFollower = async (e) =>{
        e.target.style.pointerEvents="none";
        await addFollowing(x, user.email);
        await addFollower(user.email, x);
       // document.querySelector(`.${user.email}`).innerHTML="following";
       window.location.reload();
    

    }
    const removeFollowerFollowing=async(e)=>{
        e.target.style.pointerEvents="none";
        await removeFollowing(user.email,x);
        await removeFollower(x,user.email);
        window.location.reload();
    }
    
    const findX=(list)=>{
        let flag=true;
        list.forEach((element)=>{
            if(element===x){
                flag=false;
            }
        })
        
        return flag;

    }
    return (
        
       
        <div className="user-card">
            <div className="one">
                <img src={user.profile!==''?`${user.profile}`:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'} alt="user"/>
                
            </div>
            <div className="two">
                <Link style={{color:'white'}} to="/user" state={{email:user.email}}><div>{user.name}</div></Link>
                {findX(user.followersList)?
                <button type="button" className="follow-button" onClick={e=>addtoFollowingAndFollower(e)}>Follow</button> : 
                <button type="button" className="unfollow-button" onClick={e=>removeFollowerFollowing(e)}>UnFollow</button>
                }
            </div>
        </div>
        
    )
}
Usercard.propTypes={
    user:PropTypes.object.isRequired
}
export default Usercard
