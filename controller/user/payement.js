const Product = require('../../models/product')
const Panier = require('../../models/panier')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);


exports.getPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Product.findById(panierId)
    try {
        res.render('payement', {user, panier})
    } catch (error) {
        console.log(error)
    }
}
exports.postPayement = async (req, res, next)=>{
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: panier.price,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log('payement intent', paymentIntent.id)
        panier.payementIntentId = paymentIntent.id;
        await panier.save()
        res.send({
            clientSecret: paymentIntent.client_secret,
        });        
    } catch (error) {
        console.log(error)
    }
}