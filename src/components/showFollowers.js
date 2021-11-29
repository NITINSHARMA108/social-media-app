import React, {useState, useEffect} from 'react'
import getCookie from './Cookies/getCookie'
import Usercard from './Usercard';
import { follower } from '../firebase/firebase';
import Template from './template';
import Sidenav from './Sidenav';
import Right from './Right';

const ShowFollowers = function() {
    const [followers,setFollowers]=useState([]);
    const x= getCookie();
    const getFollowers=async()=>{
        const response=await follower(x);
        // console.log(response);
        setFollowers(response);
    }
    useEffect(() => {
        getFollowers();
    }, [])
    return (
        <>
        <Sidenav />
        <div className="followers">
            <h1 style={{textAlign:'center'}}>Followers</h1>
            {followers.length!==0?followers.map((u)=><Template email={u} />):'No following '}

        </div>
        <Right />
        </>
    )
}

export default ShowFollowers
