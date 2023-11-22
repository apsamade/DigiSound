const mongoose = require('mongoose')

const panierSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    produitId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produit'
        }
    ],
    price: {
        type: Number,
    },
    payementIntentId: {
        type: String
    },
    payer: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Panier = mongoose.model('Panier', panierSchema, 'panier');
module.exports = Panier;