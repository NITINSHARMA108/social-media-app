import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { getBookmarks } from '../firebase/firebase';
import getCookie from './Cookies/getCookie'
import Post from './Post';
import checkCookie from './Cookies/checkCookie';
import Sidenav from './Sidenav';
import Right from './Right';


const Saved = function({history}) {
    const [posts,setPosts]=useState([]);
    const navigate=useNavigate();
    
   const cCookie=checkCookie();
    const x=getCookie();
    const getPosts=async()=>{
        const response=await getBookmarks(x);
        // console.log(response);
        setPosts(response);
        
    }
    useEffect(() => {
        if(!cCookie)
        {
            navigate('/signup');
        }
        else{
        getPosts();
        }
    },[])
   // console.log(posts);
    return (
        <>
            <Sidenav />
            <div className="saved">
            <h1 style={{textAlign:'center'}}>Bookmarks</h1>
                {posts.length!==0?
                posts.map((p)=><Post useremail={p.useremail} img={p.img} content={p.content} comments={p.comments} likes={p.likes} postId={p.postId} profile={p.image}/>)
                :
                <p style={{textAlign:'center'}}>No Bookmarks added</p>}
            </div>
            <Right />
        </>
        
    )
}

export default Saved;
