import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import Usercard from './Usercard';
import { getUsers } from '../firebase/firebase';
import getCookie from './Cookies/getCookie';
import checkCookie from './Cookies/checkCookie';

const Users = function({users}) {
    const x=getCookie();
    // console.log(users);
    const navigate=useNavigate();
    if(!checkCookie())
    {
        navigate('/signup');
    }
    return (
        <div className="users">
            {users.map((user)=>{
                if(user.email!==x)
                {
                    return <Usercard user={user}/>
                }
                return ''
            })}
            
            
        </div>
    )
}
Users.propTypes={
    users:PropTypes.array.isRequired
}

export default Users
