import React, {useState, useEffect} from 'react'
import Post from './Post';
import CreateTweet from './CreateTweet';
import { getTweets , getBookmarkList } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';


const Feed = function() {
    const [tweets, setTweets] =useState([]);
    const [bookmarks,setbookmarks]=useState([]);
    const x=getCookie();
    const getData= async() =>{
        const response=await getTweets();
        const response1=await getBookmarkList(x);
        setTweets(()=>response);
        setbookmarks(()=>response1);
    } 
    useEffect(() => {
      getData(); 
      
    },[])
    const inBookmark=(y)=>{
        
        
        let flag="white";
       
        bookmarks.forEach(book=>{
            if(book===y)
            {
                
                flag="blue";
            }
        })
        
        return flag;
        
    }
    return (
        <div className="feed" style={{backgroundColor:'black'}}>
            <h1 style={{color:'grey',textAlign:'center'}}>Home</h1>
            <CreateTweet />
            
            { tweets.map((element)=><Post img={element.img} useremail={element.useremail} content={element.content} likes={element.likes} comments={element.comments} postId={element.postId} profile={element.image} s={inBookmark(element.postId)}/>
            ) }
            
        </div>
    )
}

export default Feed
