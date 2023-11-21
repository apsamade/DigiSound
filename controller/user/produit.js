const Product = require('../../models/product')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);


exports.getProduit =  async (req, res, next)=>{
    const user = req.session.user
    const productId = req.params.id
    const produit = await Product.findById(productId)
    try {
        res.render('produit', {user, produit})
    } catch (error) {
        console.log(error)
    }
}
exports.postProduit = async (req, res, next)=>{
    const productId = req.params.id
    const produit = await Product.findById(productId)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: produit.price,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });        
    } catch (error) {
        console.log(error)
    }
}