import React from 'react'
import mapPointImg from '../assets/mappoint.png';
import arrowIcon2 from '../assets/arrow-down-wide-fill.svg';

const LookingForDriver = (props) => {
    return (
        <div>
            <img onClick={() => { props.setVehicleFound(false) }} className='w-7 h-10 absolute right-5 top-4 rounded-xl hover:bg-gray-300' src={arrowIcon2} alt="" />
            <h3 className='text-2xl font-semibold mb-5'>Looking for Driver...</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
            <img className='h-20 w-20 rounded-full' src="https://i.pinimg.com/736x/79/80/c3/7980c3bf6882d85ff885d3f79d42c4f7.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='p-3 flex items-center gap-5 border-b-1'>
                        <img className='h-5 w-5' src={mapPointImg} alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='p-3 flex items-center gap-5 border-b-1'>
                        <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.949 14.8882C20.7346 15.6884 19.9121 16.1633 19.1119 15.9489L3.44528 11.751C3.00205 11.6323 2.69653 11.2271 2.70424 10.7683L2.79514 5.36515L4.24403 5.75338L5.15891 9.10435L10.2542 10.4696L9.88479 2.08844L11.8166 2.60608L14.6269 11.6413L19.8883 13.0511C20.6885 13.2655 21.1634 14.088 20.949 14.8882ZM4.00008 19H20.0001V21H4.00008V19Z"></path></svg>
                        <div>
                            <h3 className='text-lg font-medium'>Drop</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='p-3 flex items-center gap-5 '>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹ {props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
                <div className='w-full mt-5'>
                    {/* <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button> */}
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver