import React from 'react'
import mapPointImg from '../assets/mappoint.png';
const LocationSearchPanel = (props) => {
    // sample array for location
    // console.log(props)
    const locations = [
      "24B, Near Kapoor's cafe, Near Famous hills.",
      "24B, Near Kapoor's cafe, Near Famous hills.",
      "24B, Near Kapoor's cafe, Near Famous hills.",
      "24B, Near Kapoor's cafe, Near Famous hills.",
    ];
  return (
    <div>
        {/* Sample data */}
        {
          locations.map(function(location, idx) {
            return <div key={idx} onClick={() => {
              props.setVehiclePanel(true)
              props.setPanelOpen(false)}} 
              className=' flex gap-4 border-2 border-gray-300 active:border-black rounded-xl p-3 my-2 items-center justify-center' >
            <img className='bg-[#eee] h-6 flex items-center justify-center w-6 rounded-full' src={mapPointImg} alt="" />
            <h4 className='font-medium' >{location}</h4>
            </div>
          })
        }
    </div>
  )
}

export default LocationSearchPanel;