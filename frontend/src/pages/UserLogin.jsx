import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { userDataContext } from '../context/userContext';
import axios from 'axios';

const UserLogin = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser} = useContext(userDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email, 
      password
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div className='p-7'>
      <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e) => submitHandler(e)} action="">
        <h3 className='text-lg font-medium mb-2'>What's yout email</h3>

        <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        
        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        
        <input className='bg-[#eeeeee] mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
      </form>
        <p className='text-center'>New here?<Link to='/signup' className='text-blue-600'> Create new Account</Link></p>
    </div>
    <div className='p-7'>
      <Link to={'/captain-login'} className='bg-[#65eb47e9] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as captain</Link>
    </div>
    </div>
  )
}

export default UserLogin;