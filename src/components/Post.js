import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import PropType from 'prop-types';
import { addLike , addBookmark, removeBookmark, unlikePost , getfromlikelist } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';

const Post = function({useremail,img,content,comments,likes,postId,profile,s}) {
    const x=getCookie();
    const [liked,setliked]=useState(false);
    const [buttonClicked,setButtonclicked]=useState(false);

    const plusLike = async (e,postId) =>{
        e.preventDefault();
        e.target.style.pointerEvents="none";
        await addLike(postId,x);
        setButtonclicked(true);
        
        window.location.reload();
    }
  
    const bookMarkAdded = async(e)=>{
        const response=await addBookmark(x,postId);
        e.target.style.pointerEvents="none";
        if(response){
            alert('post added to bookmark');
            window.location.reload();
        }
        else
        {
            alert('error in adding bookmark');
        }
    }

    const removedBookmark = async(e)=>{
        e.preventDefault();
        e.target.style.pointerEvents="none";
        const response= await removeBookmark(postId,x)
        if(response){
            window.alert('post removed from bookmark');
            window.location.reload();
        }
        else{
            window.alert('Some error occured');
            window.location.reload();
        }
    }
    const checkliked =async ()=>{
        const response=await getfromlikelist(postId,x);
        setliked(response);
        console.log(liked);
    }

    const handleunlike=async(e)=>{
        e.preventDefault();
        e.target.style.pointerEvents="none";
        const response=await unlikePost(postId,x);
        setButtonclicked(false);
        window.location.reload();
        
    }
    useEffect(()=>{
        checkliked();

    },[])
    

    
    return (
        <div className="post">
            <div className="user-img" >
                <img style={{width: '50px',height:'50px',marginTop:'10px',borderRadius: '50%'}} src={profile===''?`https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`:profile} className="" alt="user" />
            </div>
            <div className="post-detail">
                <h5 style={{marginTop:'10px'}}>{useremail}</h5> 
                
                <p>{content}</p>
                {img!=='none' ? <img src={img} alt={useremail}/> : ''}
                <div className="buttons" style={{display:'flex',justifyContent:'space-between'}}>
                    <Link to={`/post/${postId}`} state={{id:postId}} style={{color:'white',textDecoration:'none'}}><p><i className="fas fa-comment"/>{comments.length}</p></Link>
                    {!liked?<p><i className="fas fa-heart" onClick={(e)=>plusLike(e,postId)} />{likes}</p>:<p><i className="fas fa-heart" style={{color:'red'}} onClick={e=>handleunlike(e)}/>{likes}</p>}
                    { (s!=='white'?<p><i className="fas fa-bookmark" style={{color:'blue'}}  onClick={e=>removedBookmark(e)}/></p>:
                    <p><i className="fas fa-bookmark"  onClick={e=>bookMarkAdded(e)} style={{color:'white'}}/></p>)
                }
                    
                </div>
            </div>
        </div>
    )
}
Post.propTypes={
    useremail: PropType.string.isRequired,
    img: PropType.string.isRequired,
    content: PropType.string.isRequired,
    comments:PropType.array.isRequired,
    likes:PropType.number.isRequired,
    postId:PropType.string.isRequired
}

export default Post
