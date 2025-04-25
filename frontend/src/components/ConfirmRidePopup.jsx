import React, { useState } from 'react'
import arrowIcon2 from '../assets/arrow-down-wide-fill.svg';
import mapPointImg from '../assets/mappoint.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }
    return (
        <div className=''>
            <div className=''>
                {/* <img onClick={() => { props.setConfirmRidePopupPanel(false) }} className='w-7 h-10 absolute right-5 top-4 rounded-xl hover:bg-gray-300' src={arrowIcon2} alt="" /> */}
                <h3 className='text-yellow-600 text-3xl font-semibold mb-5'>Confirm this ride to start</h3>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://static.vecteezy.com/ti/gratis-vektor/t1/19133558-cartoon-flat-style-drawing-tapferkeit-seemann-mann-mit-daumen-nach-oben-geste-bereit-uber-meere-in-schiff-zu-segeln-das-vom-kapitan-geleitet-wird-mannlicher-seemann-der-uber-den-ozean-reist-grafikdesignillustration-vektor.jpg" alt="" />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-xl font-bold'>2.25 <span className='text-gray-500'>KM</span></h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                {/* <img className='h-20 w-20 ' src="https://t3.ftcdn.net/jpg/00/81/26/82/360_F_81268225_eVHynMTlVQf3wVdYOoUEz8d8KolhVZm0.jpg" alt="" /> */}
                <div className='w-full mt-5'>
                    <div className='p-3 flex items-center gap-5 border-b-1'>
                        <img className='h-5 w-5' src={mapPointImg} alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='p-3 flex items-center gap-5 border-b-1'>
                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.949 14.8882C20.7346 15.6884 19.9121 16.1633 19.1119 15.9489L3.44528 11.751C3.00205 11.6323 2.69653 11.2271 2.70424 10.7683L2.79514 5.36515L4.24403 5.75338L5.15891 9.10435L10.2542 10.4696L9.88479 2.08844L11.8166 2.60608L14.6269 11.6413L19.8883 13.0511C20.6885 13.2655 21.1634 14.088 20.949 14.8882ZM4.00008 19H20.0001V21H4.00008V19Z"></path></svg>
                        <div>
                            <h3 className='text-lg font-medium'>Drop</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='p-3 flex items-center gap-5 '>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
                <div className='w-full mt-10 flex items-center justify-center'>
                <form onSubmit={submitHandler}>
                    <input onChange={(e) => {setOtp(e.target.value)}} value={otp} className='bg-[#eee] px-10 py-4 text-base rounded-lg w-full' type="number" placeholder='ENTER OTP' />
                    <div className='w-full mt-5 gap-4'>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                        }} className='bg-red-700 text-white font-semibold py-3 px-9 rounded-lg mx-6'>Cancel</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }}
                        className='bg-green-600 text-gray-700 font-semibold py-3 px-9 rounded-lg mx-6'>Confirm</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup