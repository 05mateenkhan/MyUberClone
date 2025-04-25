import React, { use, useContext, useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import {userDataContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

 
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)

  const { socket, sendMessage, receiveMessage } = useContext(SocketContext);
  const { user } = useContext(userDataContext);
  const navigate = useNavigate();


  useEffect(() => {
    sendMessage("join", {userType: "user", userId: user._id})
    // console.log(user)
  }, [user])

  socket.on('ride-confirmed', (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })
  socket.on('ride-started', (ride) => {
    setWaitingForDriver(false);
    navigate('/riding', {
      state: { ride }
    })
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data.suggestions)
    } catch(e) {
        // handle error
        console.log("Error at home 51 : " + e);
    }
}


const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data.suggestions)
  } catch {
      // handle error
  }
}




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

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    // console.log(response.data);
    setFare(response.data);
}

async function createRide() { 
  console.log({
    pickup,
    destination,
    vehicleType
})
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  console.log(response.data);
}


  return (
    <div className='h-screen relative overflow-hidden flex'>
      <div className='h-40'>

      </div>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className="h-screen w-screen">
        {/* <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="" /> */}
        {/* <div className="absolute inset-0 z-0"> */}
        {/* <LiveTracking /> */}
      {/* </div> */}
      <div>
        <div className='relative z-[-1]'>
          <LiveTracking />
        </div>
      </div>
        
      </div>
      {/* <div className="relative z-10 w-full h-full flex"> */}
      <div className='flex flex-col justify-end absolute top-0 h-screen w-full'>
        <div className='h-[30%] bg-white p-5 relative mb-5'>

          <img ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='w-7 h-10 absolute right-5 top-4 rounded-xl hover:bg-gray-300' src={arrowIcon2} alt="" />
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className='line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full'></div>
            <input
              value={pickup} 
              // onChange={handlePickupChange}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 mb-3' type="text" placeholder='Add a pick-up location' />
            <input
              value={destination} 
              // onChange={handleDestinationChange}
              onChange={(e) => setDestination(e.target.value)}
               onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full' type="text" placeholder='Enter your destination' />
          </form>
          <button
          onClick={findTrip}
          className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'    >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className={`h-0 bg-white`}>
          <LocationSearchPanel
          suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          setPanelOpen={setPanelOpen}
          setVehiclePanel={setVehiclePanel}
          setPickup={setPickup}
          setDestination={setDestination}
          activeField={activeField}
          />
        </div>
      </div>
  
  {/* handleSuggestionClick={(suggestion) => {
            if (activeField === 'pickup') {
              setPickup(suggestion.description);
            } else {
              setDestination(suggestion.description);
            }
            setPanelOpen(false);
          }} */}

      <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <VehiclePanel
        selectVehicle={setVehicleType}
        fare={fare}
        setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <ConfirmRide 
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-8'>
        <LookingForDriver
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10   
      bottom-0 bg-white px-3 py-8'>
        <WaitingForDriver
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}
        waitingForDriver={waitingForDriver} />
      </div>

{/*  */}
{/* </div> */}
    </div>
  )
}

export default Home