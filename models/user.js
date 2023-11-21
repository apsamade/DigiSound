const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    mdp: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema, 'user');
module.exports = User;