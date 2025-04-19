import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


const UserProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if(!token) {
            navigate('/login');
        } 
    }, [])

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper