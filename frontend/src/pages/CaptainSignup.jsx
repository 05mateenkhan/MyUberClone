import React, { use, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext  } from '../context/CaptainContext';
import axios from 'axios';
const CaptainSignup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [userData, setUserData] = useState({})

  const {captain, setCaptain} = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(firstname,lastname,email,password);
    const newCaptain = {
      fullname: {
        firstname,
        lastname
      },
      email, 
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

    if(response.status === 201 || response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    console.log(userData);
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
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

{/*  */}
        <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
<div className='flex gap-4 mb-3'>

        <select className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-1/2 text-lg' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
          <option value="">Select Vehicle Type</option>
          <option value="car">car</option>
          <option value="motorcycle">motorcycle</option>
          <option value="auto">auto</option>
        </select>
        
        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' 
          type="text" 
          placeholder='Vehicle Color' 
          value={vehicleColor} 
          onChange={(e) => setVehicleColor(e.target.value)} 
          required
        />
        </div>
        <div className='flex gap-4 mb-3'>
        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' 
          type="text" 
          placeholder='Vehicle Plate Number' 
          value={vehiclePlate} 
          onChange={(e) => setVehiclePlate(e.target.value)} 
          required
        />

        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' 
          type="number" 
          placeholder='Vehicle Capacity' 
          value={vehicleCapacity} 
          onChange={(e) => setVehicleCapacity(e.target.value)} 
          required
        />

</div>

        {/*  */}
        
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign up as Captain</button>
      </form>
        <p className='text-center'>Already have an account?<Link to='/captain-login' className='text-blue-600'> Login here</Link></p>
    </div>
    <div className='p-7'>
    <p className='text-xs leading-tight font-extralight'>This site is protected by <span className="underline">reCAPTCHA</span> and the <span className="underline">Google Privacy policy</span> and <span className="underline">Terms os Service</span> apply.</p>
    </div>
    </div>
  )
}

export default CaptainSignup;