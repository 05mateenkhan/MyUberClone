import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const UserProtectedWrapper = ({children}) => {
  
    let token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {user, setUser} = useContext(userDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        token = localStorage.getItem('token'); 
        if(!token) {
            navigate('/login');
        } 
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          if(res.status === 200) {
            setUser(res.data)
            setIsLoading(false)
          }
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
          navigate('/login')
        })
    }, [token])

    if (isLoading) {
      return (
          <div>Loading...</div>
      )
  }
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper