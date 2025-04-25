const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');;
const mapService = require('../services/maps.service.js');
const {sendMessageToSocketId} = require('../socket.js');
const rideModel = require('../models/ride.model.js');

module.exports.createRide = async (req, res) => { 
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }
    const {pickup, destination, vehicleType} = req.body;
    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        const pickupCoordinates = await mapService.getCoordinates2(pickup);
        console.log(pickupCoordinates);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.latitude, pickupCoordinates.longitude, 10);
        ride.otp = "";
        // console.log(captainsInRadius);
        const rideWithUser = await rideModel.findOne({_id : ride._id}).populate('user');
        captainsInRadius.map(async (captain) => {
            // console.log(captain, ride);
           sendMessageToSocketId(captain.socketId, { 
                event: 'new-ride',
                data: rideWithUser
            })
        });

        res.status(201).json(ride);

    } catch (error) {
        res.status(400).json({error: error.message});
        // res.status(400);
        // console.log("Error ride controller 27");
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }
    const {pickup, destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }
    const {rideId} = req.body;
    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }
    const {rideId, otp} = req.query;
    try {
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }
    const {rideId} = req.body;
    try {
        const ride = await rideService.endRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}