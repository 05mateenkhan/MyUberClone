// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

// // Fix for missing marker icons in Leaflet
// import 'leaflet/dist/leaflet.css';
// delete L.Icon.Default.prototype._getIconUrl;
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });
// const MapCenterUpdater = ({ coords }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(coords);
//   }, [coords, map]);
//   return null;
// };
// const LiveTracking = () => {
//   const [coords, setCoords] = useState([17, 78]); // Default coords (London)

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setCoords([latitude, longitude]);
//         },
//         (err) => console.error('Geolocation error:', err),
//         {
//           enableHighAccuracy: true,
//           timeout: 1000 * 60 * 60,
//         }
//       );
//     }, 10000);

//     // Initial position fetch
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setCoords([latitude, longitude]);
//       },
//       (err) => console.error('Geolocation error:', err)
//     );

//     return () => clearInterval(intervalId);

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   return (
//     <MapContainer center={coords} zoom={12} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       <Marker position={coords}>
//         <Popup>You are here!</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default LiveTracking;
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper component to update the map view when coords change
const MapCenterUpdater = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);
  return null;
};

const LiveTracking = () => {
  const [coords, setCoords] = useState([17, 78]); // Default coords

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords([latitude, longitude]);
        },
        (err) => console.error('Geolocation error:', err),
        {
          enableHighAccuracy: true,
          timeout: 1000 * 60 * 60,
        }
      );
    }, 5000);

    // Initial fetch
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([latitude, longitude]);
      },
      (err) => console.error('Geolocation error:', err)
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer center={coords} zoom={14} style={{ height:'100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapCenterUpdater coords={coords} />
      <Marker position={coords}>
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveTracking;
