import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import {Link, useNavigate } from 'react-router-dom';
import Post from './Post';
import getCookie from './Cookies/getCookie';
import { getUser , getProfilePosts , deleteTweet } from '../firebase/firebase';
import Sidenav from './Sidenav';
import Right from './Right';
import checkCookie from './Cookies/checkCookie';



const Profile = function() {
    const [data,setData]=useState(null);
    const [posts,setPosts]=useState(null);
    const navigate=useNavigate();
    const cCookie=checkCookie();
    const getuserData=async(email)=>{
        const response=await getUser(email);
        const postData=await getProfilePosts(email);
        setData(response);
        setPosts(postData);
    }
    
    const deletePost = async (e,postId)=>{
        console.log(postId);
        await deleteTweet(postId);
        window.location.reload();
    }




    
    useEffect(() => {
        if(!cCookie)
        {
            navigate('/signup');
        }
        else{
        const x=getCookie();
        getuserData(x);
        }

    }, []);
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
       <div>
           <h2 style={{textAlign:'center'}}>Tweets</h2>
           {posts? posts.map((post)=>(
               <>
           <Post useremail={post.useremail} img={post.img} comments={post.comments} likes={post.likes} postId={post.postId} content={post.content} profile={post.image} s="white"/>
           
           <div className="delete-post" style={{cursor:'pointer',color:'white',textAlign:'center'}} onClick={e=>deletePost(e,post.postId)}>DeletePost</div></>)):''}
       </div>
       <hr/>
       </>
    : ''} 
  </div>
  <Right />
  </>
    )
}



export default Profile
