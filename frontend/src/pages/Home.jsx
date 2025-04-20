import React, { use, useRef, useState } from 'react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import arrowIcon from '../assets/arrow-down-wide-fill.png';
import arrowIcon2 from '../assets/arrow-down-wide-fill.svg';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

 
  const [pickup, setpickup] = useState('');
  const [destination, setdestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])


  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])




  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className="h-screen w-screen">
        <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="" />
      </div>
      <div className='flex flex-col justify-end absolute top-0 h-screen w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <img ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='w-7 h-10 absolute right-5 top-4 rounded-xl hover:bg-gray-300' src={arrowIcon2} alt="" />
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className='line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full'></div>
            <input
              value={pickup} onChange={(e) => { setpickup(e.target.value) }}
              onClick={() => (setPanelOpen(true))}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 mb-3' type="text" placeholder='Add a pick-up location' />
            <input
              value={destination} onChange={(e) => { setdestination(e.target.value) }} onClick={() => (setPanelOpen(true))}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full' type="text" placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className={`h-0 bg-white`}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>





      <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <ConfirmRide setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10   
      bottom-0 bg-white px-3 py-8'>
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>

{/*  */}


    </div>
  )
}

export default Home