import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { writeUserData } from '../firebase/firebase';

const SignUp = function() {
    
    const [userData,setuserData]=useState({
        name:'',
        email:'',
        password:'',
        cpassword:'',
        posts:[],
        followers:0,
        following:0,
        followersList:[],
        followingList:[],
        DOB:'',
        bookmarks:[],
        profile:'',
        cover:''
    })
    const navigate=useNavigate();
    const handleClose = (e) =>{
        e.preventDefault();
        document.querySelector('.signup-phone').style.display='none';
    }
    const handleSignIn = (e) =>{
        e.preventDefault();
        document.querySelector('.signup-phone').style.display='block';
    }
    const addUser = async (e)=>{
        e.preventDefault();
        if(userData.name==='' || userData.email==='' || userData.password==='' || userData.cpassword===''){
            window.alert('enter all fields');
            return ;
        }
        if(userData.password!==userData.cpassword){
            window.alert('passwords are not matching');
            return;
        }
        const date=userData.DOB;
        // console.log(date);
        const year=date.split('-')[0];
        const today=new Date();
        const currYear=today.getFullYear();
        if(currYear-year<=17)
        {
            alert('you are not eligible to open an account .User must be 18 years old');
            return ;
        }
        if(userData.password.length<=6)
        {
            alert('password is too short length should <6');
            return;
        }

        const response=await writeUserData(userData);
       // console.log(response);

        if(!response){
            alert('user already exists');
            
        }
        else
        {
            navigate('/signin');
        }
        
    }
    const handleChanges = (e)=>{
        const {name} = e.target;
        const {value} = e.target;
        setuserData((data)=>({...data,[name]:value}))
       // console.log(userData);
        
    }
    return (
        <>
        <div className="signup">
            <div className="signup-images">
                
                <img src="https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg" alt="twitter-logo" width="400px"/>
            </div>
            <div className="signup-content">
                <img src="https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg" width="50px" height="50px" alt="twitter-logo"/>
                <h1>Happening now</h1>
                <h2>Join Twitter Today</h2>
                <form>
                   
                    <button type="button" style={{backgroundColor:'red',color:'white'}} onClick={(e)=>handleSignIn(e)}>Sign up with email</button>
                    <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                    <h3>Already Have an Account ?</h3>
                    <button type="button" style={{backgroundColor:'blue'}}><Link to="/signin" style={{textDecoration:'none',color:'white'}}>Sign In</Link></button>
                </form>

            </div>
            </div>
            <div className="signup-phone">
                <i className="fas fa-times" style={{float:'right'}} onClick={(e)=>handleClose(e)}/>
                
                <form>
                    <h2>Create your Account</h2>
                    <input type="text" placeholder="name" name="name" value={userData.name} onChange={(e)=>handleChanges(e)}/>
                    <input type="email" placeholder="email" name="email" value={userData.email} onChange={(e)=>handleChanges(e)}/>
                    <input type="password" placeholder="password" name="password" value={userData.password} onChange={(e)=>handleChanges(e)}/>
                    <input type="password" placeholder="confirm password" name="cpassword" value={userData.cpassword} onChange={(e)=>handleChanges(e)}/>
                    <p>Date of Birth</p>
                    <small>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</small>
                    <input type="date" name="DOB" onChange={(e)=>handleChanges(e)} />
                    <button type="button" onClick={(e)=>addUser(e)}>Continue</button>

                </form>
            </div>
           </>
            
        
    )
}

export default SignUp
