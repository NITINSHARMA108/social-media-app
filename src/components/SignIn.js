import React, {useState} from 'react'
import { useNavigate , Link } from 'react-router-dom';

import { Login } from '../firebase/firebase';
import createCookie from './Cookies/createCookie';

const SignIn = function() {
    const [data,setData]=useState({email:'',password:''});
    const navigate=useNavigate();
    
    const handleChange=(e)=>{
        setData(()=>({...data,[e.target.name]:e.target.value}))
    }

    const onLogin=async (e)=>{

        e.preventDefault();
        const response = await Login(data.email,data.password);
        // console.log(response);
        if(response){
            // creating cookie
            createCookie(data.email);
            navigate('/');

        }
        else{
            alert('unsuccessful login');
        }
    }
    return (
        <div className="signin">
            
            <form>
                <Link to="/"><i className="fas fa-times" style={{float:'right'}} /></Link>
                <h1>Sign In</h1>
               
                <input type="text" placeholder="email" name="email" value={data.email} onChange={e=>handleChange(e)}/>
                <input type="password" placeholder="password" name="password" value={data.password} onChange={e=>handleChange(e)}/>
                <button type="button" onClick={e=>onLogin(e)}>Next</button>
                
                <p>Don&lsquo;t Have an account <Link to="/">Sign Up</Link></p>
            </form>
            
        </div>
    )
}

export default SignIn
