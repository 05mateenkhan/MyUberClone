import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(token) {
        axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
          if(response.status === 200) {
            localStorage.removeItem('token');
            console.log('logout successful');
            navigate('/captain-login');
          }  
        })
    }
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout