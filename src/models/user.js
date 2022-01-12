const validator = require('validator')
const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number
    }
})

module.exports = User