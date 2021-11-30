import React,{useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {ref, getDownloadURL} from 'firebase/storage';
import { storage, uploadBytes, postTweets } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';


const CreateTweet = function() {
    const [imgfile,setImgfile]=useState('');
    const [flag,setFlag]=useState(false);
    const [tweet,setTweet]=useState({
        postId:uuidv4(),
        username:'',
        content:'',
        likes:0,
        comment:[],
        img:'',
        useremail:getCookie(),
        likelist:[]
        
    })
    
    const handleChange = (e) =>{
        e.preventDefault();
        const {name}=e.target;
        if(name==='img'){
            const value= e.target.files[0];
            setImgfile(value);
            
        }
        else{
            const {value}=e.target;
            setTweet(()=>({...tweet,[name]:value}))
        }
        
        

    }
    const submitTweet = async (e)=>{
        // setTweet(()=>({...tweet,useremail:getCookie()}));
        e.preventDefault();
        e.target.style.pointerEvents="none";
        if(imgfile!=='')
        {
            const storageRef = ref(storage,`posts/${tweet.postId}` );
            // 'file' comes from the Blob or File API
            
            uploadBytes(storageRef, imgfile).then((snapshot) => {
                
                
                getDownloadURL(storageRef)
                .then((url)=>{
                   
                    
                    setTweet(()=> ({...tweet,img:url}))
                    setFlag(true);
                
                })
                .catch((err)=>{
                   // console.log(`error:${err}`);
                })
            })
            .catch((err)=>console.log(`eror${err}`))
        }
        else
        {
            setTweet(()=>({...tweet,img:'none'}))
        }
        
             


    }
    

    useEffect(() => {

            if(tweet.img!=='')
            {
                postTweets(tweet).then((response)=>{
                
                    window.location.reload();
                }) 
            }
        
       
    }, [tweet])
    return (
        <div style={{border:'1px solid grey'}} className='create-tweet'>
            <textarea rows="5" name="content"  placeholder="Whats Happening ?" className="content" value={tweet.content} onChange={(e)=>handleChange(e)}/><br />
            <p style={{display:'flex',justifyContent:'center'}}>
                <input type="file" name="img" className="file-upload" onChange={e=>handleChange(e)} />
                <button type="button" className="tweet" style={{paddingTop:'2px',paddingBottom:'2px'}} onClick={(e)=>submitTweet(e)}>Tweet</button>
            </p>
        </div>
    )
}

export default CreateTweet
