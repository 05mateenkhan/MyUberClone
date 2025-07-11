import React from 'react'
import { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-3'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://static.vecteezy.com/ti/gratis-vektor/t1/19133558-cartoon-flat-style-drawing-tapferkeit-seemann-mann-mit-daumen-nach-oben-geste-bereit-uber-meere-in-schiff-zu-segeln-das-vom-kapitan-geleitet-wird-mannlicher-seemann-der-uber-den-ozean-reist-grafikdesignillustration-vektor.jpg" alt="" />
              <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>Rs. 295.20</h4>
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
          </div>

          <div className='mt-5 flex p-3 bg-gray-100 rounded-2xl gap-5 w-full justify-between'>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-timer-2-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-booklet-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails