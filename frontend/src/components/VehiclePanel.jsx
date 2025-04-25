import React from 'react'
import arrowIcon2 from '../assets/arrow-down-wide-fill.svg';
const VehiclePanel = (props) => {
  return (
    <div>
      <img onClick={() => {props.setVehiclePanel(false)}} className='w-7 h-10 absolute right-5 top-4 rounded-xl hover:bg-gray-300' src={arrowIcon2} alt="" />
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        {/* car */}
        <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
        }}
          className='flex border-2 bg-gray-300 border-white active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img className='h-10' src="https://imgd.aeplcdn.com/370x208/n/cw/ec/132513/7-series-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-sm'>Uber Go <span>👤4</span></h4>
            <h5  className='font-medium text-sm'>2 mins away </h5>
            <p  className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.car}</h2>
        </div>

        {/* moto */}
        <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('motorcycle')
        }}
         className='flex border-2 bg-gray-300 border-white active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_YFifMGaOPEmQr8C6EEJMfedk_VT5GjoqQ&s" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-sm'>Uber Moto <span>👤1</span></h4>
            <h5  className='font-medium text-sm'>3 mins away </h5>
            <p  className='font-normal text-xs text-gray-600'>Affordable, moto rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.motorcycle}</h2>
        </div>

        {/* auto */}
        <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
        }}
          className='flex border-2 bg-gray-300 border-white active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-sm'>Uber Auto <span>👤3</span></h4>
            <h5  className='font-medium text-sm'>9 mins away </h5>
            <p  className='font-normal text-xs text-gray-600'>Affordable, moto rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel