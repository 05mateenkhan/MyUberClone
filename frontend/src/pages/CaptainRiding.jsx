import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {

    const finishRidePanelRef = useRef(null);
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const location = useLocation();
    const rideData = location.state?.ride;

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])


    return (
        <div>
            <div className="h-screen w-screen">
                <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
                    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                    <Link to={'/captain-login'} className='h-10 w-10 bg-white flex items-center justify-center rounded-xl'>
                        <i className="ri-logout-box-r-line"></i>
                    </Link>
                </div>
                <div className={`h-4/5 overflow-hidden ${finishRidePanel ? "hidden" : ""}`}>
                    {/* <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news//article16106961.ece/ALTERNATES/s1200b/2_Uber-pink-cars.jpg" alt="" /> */}
                    <LiveTracking />
                </div>
                <div className='flex flex-col h-1/4 bg-yellow-300'>
                    <div className='flex justify-center items-center '>
                        <i onClick={() => {
                    setFinishRidePanel(true)
                }} className="text-3xl ri-arrow-up-wide-fill"></i>
                    </div>
                    <div className='p-4 flex items-center justify-between gap-4'>
                        <h4 className='text-xl'>4 KM AWAY</h4>
                        <button onClick={() => {
                    setFinishRidePanel(true)
                }} className='bg-blue-500 text-white text-xl font-medium py-2 px-7 rounded-lg active:bg-blue-300'>Complete Ride</button>
                    </div>
                </div>
                <div ref={finishRidePanelRef} className='fixed h-screen w-full z-10  bottom-0 bg-white px-3 py-8'>
                    <FinishRide
                    rideData={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
                </div>
            </div>
        </div>
    )
}

export default CaptainRiding