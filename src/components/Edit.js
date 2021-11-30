import React, { useState, useEffect} from 'react'
// import {useHistory} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {ref, getDownloadURL} from 'firebase/storage';
import { storage, uploadBytes, postTweets, addAdditionalData, getUser } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';
import checkCookie from './Cookies/checkCookie';
import Sidenav from './Sidenav';
import Right from './Right';

const Edit = function() {
    const navigate=useNavigate();
    const x=getCookie();
    const [profile,setProfile]=useState('');
    const [cover,setCover]=useState('');
    const [data,setData]=useState({
        bio:'',
        password:'',
        cpassword:''
    });
    const [userdata,setuserdata]=useState(null);
    const cCookie=checkCookie();
    const loadData=async ()=>{
        const response=await getUser(x);
        setuserdata(response);
        setData(()=>({...data,bio:response.bio}));
    }
    const handleprofileChange = (e)=>{

        setProfile(e.target.files[0]);
    }
    const handlecoverChange = (e) =>{
        setCover(e.target.files[0]);

    }
    const handleDatachanges = (e)=>{
        const {name,value}=e.target;
        setData(()=>({...data,[name]:value}))

    }
    const submitdata=async(e)=>{
        e.preventDefault();
        e.target.style.pointerEvents="none";
        const x=getCookie();
        // console.log(x);
        let storageRef1; let response1; let url1='';
        let storageRef2; let response2; let url2='';
        if(data.password!=='')
        {
            if(data.password!==data.cpassword)
            {
                alert('password and confirm password field are mismatched');
            }
        }
        if(profile!=='')
        {
            storageRef1=ref(storage,`profile/${x}`);
            response1=await uploadBytes(storageRef1,profile);
            url1=await getDownloadURL(storageRef1);
        }
        else
        {
            url1=userdata.profile;
        }
        if(cover!=='')
        {
            storageRef2=ref(storage,`cover/${x}`);
            response2=await uploadBytes(storageRef2,cover);
            url2=await getDownloadURL(storageRef2);
        }
        else{
            url2=userdata.cover;
        }
        // await setImageURL(url1,url2,bio,password);
        if(data.bio==='')
        {
            console.log(userdata.bio)
            await addAdditionalData(x,url1,url2,userdata.bio,data.password);
        }
        else{
            console.log(data.bio);
            await addAdditionalData(x,url1,url2,data.bio,data.password);
        }

        
        window.location.reload();
    }
    const showPassform = (e)=>{
        e.preventDefault();
        if(document.querySelector('.change-pass').style.display==="flex")
        {
            document.querySelector('.change-pass').style.display="none";
        }
        else{
            document.querySelector('.change-pass').style.display="flex";
        }
        
    }
    useEffect(()=>{
        if(!cCookie)
        {
            navigate('/signup');
        }
        else{
            loadData();
        }
    },[])
    
    return (
        <>
        <Sidenav />
        
            <div className="edit">
                <h1 style={{textAlign:'center'}}>Edit Profile</h1>
                {userdata ?
                <form>
                    {userdata.profile!==''?<img src={userdata.profile} alt="profile" width="100%" />:"profile photo is not set"}
                    <label htmlFor="profile-photo">Update Profile photo</label>
                    <input type="file" id="profile-photo" onChange={(e)=>handleprofileChange(e)}/>
                    
                    {userdata.cover!==''?<img src={userdata.cover} alt="cover" width="100%" />:"cover photo is not set"}
                    <label htmlFor="cover-photo">Update Cover photo</label>
                    <input id="cover-photo" type="file" onChange={(e)=>handlecoverChange(e)}/>
                    
                    <label htmlFor="bio">Add bio</label>
                    <input type="text" name="bio" maxLength="100" value={data.bio} onChange={(e)=>handleDatachanges(e)}/>
                    <button type="button"  onClick={(e)=>showPassform(e)}>Change Password</button>
                    <div className="change-pass">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password" onChange={e=>handleDatachanges(e)}/> 
                        <label htmlFor="password">Confirm  Password</label>
                        <input type="password" name="cpassword" onChange={e=>handleDatachanges(e)}/>
                    </div>
                    <button type="button" onClick={e=>submitdata(e)}>Save</button>
                </form>:
        ''}
            </div>

        <Right />
        </>
    )
}

export default Edit
