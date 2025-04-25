import React from 'react'
import mapPointImg from '../assets/mappoint.png';
const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    // sample array for location
    // console.log(props)
    const handleSuggestionClick = (suggestion) => {
      if (activeField === 'pickup') {
          setPickup(suggestion)
      } else if (activeField === 'destination') {
          setDestination(suggestion)
      }
      if(!Array.isArray(suggestions)) {
        console.log("Error: suggestions is not an array", suggestions);
      }
      // setVehiclePanel(true)
      // setPanelOpen(false)
  }

    // const locations = [
    //   "24B, Near Kapoor's cafe, Near Famous hills.",
    //   "24B, Near Kapoor's cafe, Near Famous hills.",
    //   "24B, Near Kapoor's cafe, Near Famous hills.",
    //   "24B, Near Kapoor's cafe, Near Famous hills.",
    // ];
    suggestions = [
      { address: 'Golconda, Hyderabad, Telangana' },
      { address: 'Moinabad, Hyderabad, Telangana' },
      { address: 'King Koti, Hyderabad, Telangana' },
      { address: 'Secundrabad, Hyderabad, Telangana' },
      { address: '7 Tombs, Hyderabad, Telangana' },
  ]
  return (
    <div>
        {/* Sample data */}
        {
          // Array.isArray(suggestions) && 
          suggestions.map((location, idx) => (
            <div key={idx} onClick={() => handleSuggestionClick(location.address)} 
              className=' flex gap-4 border-2 border-gray-300 active:border-black rounded-xl p-3 my-2 items-center justify-center' >
            <img className='bg-[#eee] h-6 flex items-center justify-center w-6 rounded-full' src={mapPointImg} alt="" />
            <h4 className='font-medium' >{location.address}</h4>
            </div>
          ))
        }
    </div>
  )
}

export default LocationSearchPanel;