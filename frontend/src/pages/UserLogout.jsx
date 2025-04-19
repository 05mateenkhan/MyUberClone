import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(token) {
        axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
          if(response.status === 200) {
            localStorage.removeItem('token');
            console.log('/logout');
            navigate('/login');
          }  
        })
    }
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout