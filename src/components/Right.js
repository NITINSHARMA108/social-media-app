import React,{useState,useEffect} from 'react'
import Users from './Users'
import { getUsers } from '../firebase/firebase';

const Right = function() {
    const [users,setUsers]=useState([]);
    const GUsers = async ()=>{
        const response = await getUsers();
        setUsers(()=> response);
    }
    useEffect(() => {
        GUsers();
    }, [])
    return (
        <div className="right-side">
           <Users users={users}/>
        </div>
         
    )
}

export default Right
