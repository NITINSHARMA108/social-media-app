import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {getUser} from '../firebase/firebase';
import Right from './Right';
import Sidenav from './Sidenav';

const NotHost = function() {
    const location=useLocation();
    const {email}=location.state;
    const [data,setData]=useState([]);
    const getuserData=async(email)=>{
        const response=await getUser(email);
        setData(response);
       
    }
    useEffect(() => {
        getuserData(email)
    }, [email])
    return (
        <>
        <Sidenav />
        
    <div className="profile">
        {data ?  <>
        <div  className='cover-photo'>
             <img src={data.cover} width="100%" height="100%" alt="cover"/>
         </div>  
        <div style={{marginLeft:'10px'}}>
            <img src={data.profile!==''?`${data.profile}`:`https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`} alt="user-profile-img" className="user-profile-img" />
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.bio}</p>
            <span>{data.followers} Followers </span>
             <span>{data.following} Following</span>
            
        </div>
        </>:''}
    </div>
    <Right/></>
    )
}

export default NotHost
