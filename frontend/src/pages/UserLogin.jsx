import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      email, 
      password
    });
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