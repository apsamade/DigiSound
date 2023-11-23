const Product = require('../../models/product')
const Panier = require('../../models/panier')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN

exports.getPayement = async (req, res, next) => {
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)
    try {
        res.render('payement', { user, panier })
    } catch (error) {
        console.log(error)
    }
}
exports.postPayement = async (req, res, next) => {
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)
    const amount = panier.price
    const product = await stripe.products.create({
        name: 'Panier',
    });
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: 'eur',
    })
    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${YOUR_DOMAIN}/panier/${panierId}/confirmation-du-payement?session_id={CHECKOUT_SESSION_ID}`,
        });

        res.send({ clientSecret: session.client_secret });
    } catch (error) {
        console.log(error)
    }
}
