const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controllers/user.controllers')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 chars long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 chars long')
], userController.registerUser)

module.exports = router;