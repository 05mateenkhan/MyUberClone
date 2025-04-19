import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email, 
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

    if(response.status === 200) {
      const data = response.data;

      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
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
        <p className='text-center'>Register as a Captain?<Link to='/captain-signup' className='text-blue-600'> Create new Account</Link></p>
    </div>
    <div className='p-7'>
      <Link to={'/login'} className='bg-[#0c4a4fe9] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as user</Link>
    </div>
    </div>
  )
}

export default CaptainLogin;;