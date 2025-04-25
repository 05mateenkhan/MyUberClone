import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { SocketContext } from '../context/SocketContext';
import {CaptainDataContext} from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {

const popupPanelRef = useRef(null);
const confirmPopupPanelRef = useRef(null);

const [ridePopupPanel, setRidePopupPanel] = useState(false);
const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

const { socket, sendMessage, receiveMessage } = useContext(SocketContext);
const [ride, setRide] = useState(null);

const { captain } = useContext(CaptainDataContext);

useEffect(() => {
  sendMessage("join", {userType: 'captain', userId: captain._id});

  const updateLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log({userId: captain._id,
        //   location: {
        //     ltd: position.coords.latitude,
        //     lng: position.coords.longitude
        //   }});
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }
  const locationInterval = setInterval(updateLocation, 10000);
  updateLocation();
  // return () => clearInterval(locationInterval)
}, [])

socket.on('new-ride', (data) => {
  // console.log(data);
  setRide(data);
  setRidePopupPanel(true);
})

async function confirmRide() {
  
  // console.log({ride}, {captain});
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
    rideId: ride._id,
    captainId: captain._id,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  setRidePopupPanel(false);
  setConfirmRidePopupPanel(true);
}

useGSAP(function () {
  if (ridePopupPanel) {
    gsap.to(popupPanelRef.current, {
      transform: 'translateY(0)'
    })
  } else {
    gsap.to(popupPanelRef.current, {
      transform: 'translateY(100%)'
    })
  }
}, [ridePopupPanel])


useGSAP(function () {
  if (confirmRidePopupPanel) {
    gsap.to(confirmPopupPanelRef.current, {
      transform: 'translateY(0)'
    })
  } else {
    gsap.to(confirmPopupPanelRef.current, {
      transform: 'translateY(100%)'
    })
  }
}, [confirmRidePopupPanel])
  return (
    <div>
      <div className="h-screen w-screen">
        <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link to={'/captain-login'} className='h-10 w-10 bg-white flex items-center justify-center rounded-xl'>
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className='h-3/5 relative z-[-1]'>
          {/* <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="" /> */}
          <LiveTracking />
        </div>
        <div className='bg-white mt-5 h-2/5 p-4'>
          <CaptainDetails />
        </div>

        <div ref={popupPanelRef} className='fixed w-full z-10  bottom-0 bg-white px-3 py-8'>
          <RidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}  setRidePopupPanel={setRidePopupPanel} 
          confirmRide={confirmRide}
          />
        </div>
        <div ref={confirmPopupPanelRef} className='fixed h-screen w-full z-10  bottom-0 bg-white px-3 py-8'>
          <ConfirmRidePopup  
          ride={ride}
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>

      </div>
    </div>
  )
}

export default CaptainHome