import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CaptainProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    // let token = localStorage.getItem('token');
    
    useEffect(() => {
    // token = localStorage.getItem('token');
    // setToken(localStorage.getItem('token'));
        if(!token) {
            navigate('/captain-login');
        } 
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
             headers: {
                Authorization: `Bearer ${token}`
             }
        }).then(response => {
            if(response.status === 200 && !response.captain) {
                setCaptain(response.data.captain)
                setIsLoading(false);
            }
            else{
                console.log(err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })
    },[]);

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectedWrapper