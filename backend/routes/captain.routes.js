const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controllers');
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 chars long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 chars long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 chars long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 chars long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')


], captainController.createCaptain);

module.exports = router;
