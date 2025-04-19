import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {userDataContext} from '../context/userContext';



const UserSignup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [userData, setUserData] = useState({})


  const navigate = useNavigate();

  const [user, setUser] = useContext(userDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(firstname,lastname,email,password);
    const newUser = {
      fullname: {
        firstname,
        lastname
      },
      email, 
      password
    };
    const response = await axios.post(`${import.meta.
    env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status === 201) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div className='p-7'>
      <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e) => submitHandler(e)} action="">
        <h3 className='text-base font-medium mb-2'>What's your name</h3>
        <div className='flex gap-4 mb-5'>
        <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='First name' value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
        <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
        </div>

        <h3 className='text-base font-medium mb-2'>What's your email</h3>

        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        
        <h3 className='text-base font-medium mb-2'>Enter password</h3>
        
        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign up</button>
      </form>
        <p className='text-center'>Alreadt have an account?<Link to='/login' className='text-blue-600'> Login here</Link></p>
    </div>
    <div className='p-7'>
      <p className='text-xs leading-tight font-extralight'>This site is protected by <span className="underline">reCAPTCHA</span> and the <span className="underline">Google Privacy policy</span> and <span className="underline">Terms os Service</span> apply.</p>
    </div>
    </div>
  )
}

export default UserSignup;