import React, { useState, useEffect} from 'react'
// import {useHistory} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {ref, getDownloadURL} from 'firebase/storage';
import { storage, uploadBytes, postTweets, addAdditionalData } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';
import checkCookie from './Cookies/checkCookie';
import Sidenav from './Sidenav';
import Right from './Right';

const Edit = function() {
    const navigate=useNavigate();
    const [profile,setProfile]=useState('');
    const [cover,setCover]=useState('');
    const [data,setData]=useState({
        bio:'',
        password:'',
        cpassword:''
    });
    const cCookie=checkCookie();
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
        const x=getCookie();
        // console.log(x);
        let storageRef1; let response1; let url1;
        let storageRef2; let response2; let url2;
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
        if(cover!=='')
        {
            storageRef2=ref(storage,`cover/${x}`);
            response2=await uploadBytes(storageRef2,cover);
            url2=await getDownloadURL(storageRef2);
        }
        // await setImageURL(url1,url2,bio,password);

        await addAdditionalData(x,url1,url2,data.bio,data.password);
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
    },[])
    
    return (
        <>
        <Sidenav />
        <div className="edit">
            <h1 style={{textAlign:'center'}}>Edit Profile</h1>
            <form>
                <label htmlFor="profile-photo">Profile photo</label>
                <input type="file" id="profile-photo" onChange={(e)=>handleprofileChange(e)}/>
                <label htmlFor="cover-photo">Cover photo</label>
                <input id="cover-photo" type="file" onChange={(e)=>handlecoverChange(e)}/>
                <label htmlFor="bio">Add bio</label>
                <input type="text" maxLength="100" onChange={(e)=>handleDatachanges(e)}/>
                <button type="button" onClick={(e)=>showPassform(e)}>Change Password</button>
                <div className="change-pass">
                    <label htmlFor="password">New Password</label>
                    <input type="password" onChange={e=>handleDatachanges(e)}/> 
                    <label htmlFor="password">Confirm  Password</label>
                    <input type="password" onChange={e=>handleDatachanges(e)}/>
                </div>
                <button type="button" onClick={e=>submitdata(e)}>Save</button>
            </form>
        </div>
        <Right />
        </>
    )
}

export default Edit
