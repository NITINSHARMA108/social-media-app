import React,{useState,useEffect} from 'react'
import getCookie from './Cookies/getCookie';
import Usercard from './Usercard';
import Users from './Users';
import { followingfunc } from '../firebase/firebase';
import Template from './template';
import Sidenav from './Sidenav';
import Right from './Right';

const ShowFollowing = function() {
    const [following,setFollowing]=useState([])
    const x=getCookie();
    const getFollowing = async()=>{
        const response= await followingfunc(x);
        setFollowing(response);

    }
    useEffect(() => {
       getFollowing();
    }, [])

    return (
        <>
        <Sidenav />
        <div className="followings">
            {following.length!==0?following.map((u)=>
            <Template email={u}/>):<p style={{textAlign:'center'}}>no followings</p>}
        </div>
        <Right />
        </>
    )
}

export default ShowFollowing
