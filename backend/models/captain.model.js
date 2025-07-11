const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 



const captainSchema = new mongoose.Schema({ 
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Email must be 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

})
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}
captainSchema.methods.comparePassword = async function (password) {
    if(!this.password) {
        throw new Error('Password is required for comparison');
    } 
    return await bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async function (password) {
    if (!password) {
        throw new Error('Password is required for hashing');
    }
    return await bcrypt.hash(password, 10);
}
const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;