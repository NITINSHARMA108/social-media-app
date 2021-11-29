import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import { getIndividualTweet , addcomment } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';
import Right from './Right';
import Sidenav from './Sidenav';

const Tweet = function() {
    const location=useLocation();
    const {id}=location.state;
    const [data,setData]=useState(null);
    const [comment,setcomment]=useState('');
    const getIndividualTweetData = async(id)=>{
        const response=await getIndividualTweet(id);
        // console.log(response);
        setData(response);
    }

    
    const handlecomment=(e)=>{
        setcomment(e.target.value);

    }
    const submitcomment = async (e)=>{
        if(comment==='')
        {
            window.alert('enter text')

        }
        else
        {
            await addcomment(comment,id,getCookie());
            setcomment('');
        }
    }
    // console.log(id);
    useEffect(() => {
        if(comment==='')
        {
        getIndividualTweetData(id);
       
        }
        
    }, [comment]) 
    return (
        <>
        <Sidenav />
        
        <div className="single-tweet">
        {data ?
        <>
        <h1 style={{textAlign:'center'}}>Tweet</h1>
        <h2>{data.useremail}</h2>
        <p>{data.content}</p>
        <img src={data.img} alt="post" height="400px" />

        <div className="icons" style={{display:'flex',justifyContent:'space-around'}}>
        <div> Likes {data.likes}</div>
        <div><i className="fas fa-comment" />{data.comments.length}</div>
        </div>
        <div>
            <textarea type="text" value={comment} onChange={e=>handlecomment(e)}/><br />
            <button type="button" onClick={e=>submitcomment(e)}>Add</button>
            <h3 style={{color:'white',textAlign:'center'}}>Comments</h3>
            {data.comments.map((data)=>(
                <div className="comment">
                <p style={{fontWeight:'bold'}}>{data.useremail}</p>
                <div >{data.comment}</div>
                </div>
                ))}
        </div>
    </> : 
    ''}
        
        </div>
        <Right />
        </>
    
    )
}

export default Tweet
