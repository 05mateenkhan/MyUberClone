import axios from 'axios';
import captainModel from '../models/captain.model.js';

export async function getCoordinates(address) {
    const options = {
        method: 'GET',
        url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
        params: {
            address: address || 'Hyderabad, India',
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_MAPS_API,
            'x-rapidapi-host': 'address-from-to-latitude-longitude.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        const coordinates = response.data.Results[0];
        return {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getCoordinates2(address) {
    address = address.replace(/ /g, '+');
    address = address.replace(/,/g, '');
    // console.log(address);
    const options = {
        method: 'GET',
        url: 'https://nominatim.openstreetmap.org/search?format=json',
        params: {
            q: address || 'Hyderabad India',
        },
    };
    try {
        const response = await axios.request(options);
        const coordinates = response.data[0];
        // console.log(coordinates);
        return {
            latitude: coordinates.lat,
            longitude: coordinates.lon
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// function toRad(degree) {
//     return degree * Math.PI / 180;
// }

// function haversine(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Returns the distance in kilometers
// }
export async function getDistanceTime(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    // console.log(origin);
    const originCoordinates = await getCoordinates2(origin);
    const destinationCoordinates = await getCoordinates2(destination);
    // console.log(originCoordinates);
    // res.send("hi");

    const apiKey = 'pk.e6803bef0b0d029630d8aa1102985998';
    const url = `https://us1.locationiq.com/v1/directions/driving/${originCoordinates.longitude},${originCoordinates.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?key=${apiKey}&overview=false`;

    try {
        const response = await axios.get(url);
        if (response.data.code === 'Ok') {
                const info = response.data.routes[0];
                // console.log(info);
                return info;
                // duration 
                // distance
             }
             else{
                throw new Error('Error fetching distance and time');
        }
    }
    catch (error) {
        console.error('Error fetching distance and time:', error);
        throw error;
    }
}
// getDistanceTime({ latitude: 51.503355, longitude: -0.127627 }, { latitude: 51.509562, longitude: -0.087199 });
// getCoordinates();

// https://us1.locationiq.com/v1/directions/driving/{51.503355},{-0.127627};{51.509562},{-0.087199}?key=pk.e6803bef0b0d029630d8aa1102985998&overview=false
// https://us1.locationiq.com/v1/directions/driving/-0.127627,51.503355;-0.087199,51.509562?key=pk.e6803bef0b0d029630d8aa1102985998&overview=false 

export async function getAutoCompleteSuggestions(input) {
    if(!input) {
        throw new Error('Query is required');
    }
    const options = {
        method: 'GET',
        url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
        params: {
            address: input,
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_MAPS_API,
            'x-rapidapi-host': 'address-from-to-latitude-longitude.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        const results = response.data.Results;
        const suggestions = await results.map((result) => {
            return {
                // address: result.address, 
                address: result.address,
            }
        })

        return {
            suggestions
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCaptainsInTheRadius(ltd, lng, radius) {

    //radius in km

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ltd, lng], radius/6371]
            }
        }
    });
    return captains;
}