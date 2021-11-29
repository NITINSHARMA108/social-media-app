import React from 'react'
import {Link} from 'react-router-dom';
import PropType from 'prop-types';
import { addLike , addBookmark, removeBookmark } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';

const Post = function({useremail,img,content,comments,likes,postId,profile,s}) {
    const plusLike = async (e,postId) =>{
        e.preventDefault();
        await addLike(postId);
        
    }
  
    const bookMarkAdded = async(e)=>{
        const response=await addBookmark(getCookie(),postId);
        if(response){
            alert('post added to bookmark')
            window.location.reload();
        }
        else
        {
            alert('error in adding bookmark');
        }
    }

    const removedBookmark = async(e)=>{
        e.preventDefault();
        const response= removeBookmark(postId,getCookie())
        if(response){
            window.alert('post removed from bookmark');
            window.location.reload();
        }
        else{
            window.alert('Some error occured');
            window.location.reload();
        }
    }
    

    
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
                    <p><i className="fas fa-heart" onClick={(e)=>plusLike(e,postId)} />{likes}</p>
                    {s!=='white'?<p><i className="fas fa-bookmark" style={{color:'blue'}}  onClick={e=>removedBookmark()}/></p>:
                    <p><i className="fas fa-bookmark"  onClick={e=>bookMarkAdded(e)} style={{color:'white'}}/></p>
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
