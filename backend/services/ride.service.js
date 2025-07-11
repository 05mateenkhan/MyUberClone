const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {sendMessageToSocketId} = require('../socket.js');
async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);
    // console.log(distanceTime);
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20,
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8,
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5,
    };
    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance*2 / 1000) * perKmRate.auto + (distanceTime.duration / 60) * perMinuteRate.auto),

        car: Math.round(baseFare.car + (distanceTime.distance*2 / 1000) * perKmRate.car + (distanceTime.duration / 60) * perMinuteRate.car),
        
        motorcycle: Math.round(baseFare.motorcycle + (distanceTime.distance*2 / 1000) * perKmRate.motorcycle + (distanceTime.duration / 60) * perMinuteRate.motorcycle),
    }
    return fare;
}
module.exports.getFare = getFare;
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(10 ** (num - 1), 10 ** num).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({user, pickup, destination, vehicleType})=> { 
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicle type are required');
    }
    const fare = await getFare(pickup, destination);
    // console.log(fare);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });
    return ride;
}
module.exports.confirmRide = async ({rideId, captain}) => { 
    if(!rideId) {
        throw new Error('Ride id is required');
    }
    await rideModel.findOneAndUpdate(
        {_id: rideId },
        {status: 'accepted', captain: captain._id}
    );
    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error('Ride not found');
    }
    await ride.save();
    return ride;
}
module.exports.startRide = async ({rideId, otp, captain}) => {
    if(!rideId || !otp || !captain) {
        throw new Error('Ride id and otp are required');
    }
    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
    if(!ride) {
        throw new Error('Ride not found');
    }
    if(ride.status !== 'accepted') {
        throw new Error('Ride is not accepted yet');
    }
    const isMatch = ride.otp === otp;
    if(!isMatch) {
        throw new Error('Invalid otp');
    }
    ride.status = 'ongoing';
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    await ride.save();
    return ride;
}
module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId) {
        throw new Error('Ride id is required');
    }
    const ride = await rideModel.findOne({_id: rideId, captain: captain._id}).populate('user').populate('captain').select('+otp');
    if(!ride) {
        throw new Error('Ride not found');
    }
    if(ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing yet');
    }
    ride.status = 'completed';
    await ride.save();
    return ride;
}
