const mongoose = require('mongoose')

const productUser = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    mdp: {
        type: Number,
        required: true
    },
}, {timestamps: true})

const User = mongoose.model('User', productUser, 'user');
module.exports = User;