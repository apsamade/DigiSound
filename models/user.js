const mongoose = require('mongoose')

const productUser = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    mdp: {
        type: Number,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model('User', productUser, 'user');
module.exports = User;