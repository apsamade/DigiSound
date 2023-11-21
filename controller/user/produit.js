const Product = require('../../models/product')
const stripe = require("stripe")('sk_test_51NOT07FkFyJ92wXRVugZNlvyKW9ayZu0F2FpA4d6F65enhmYcDReLirKZHhvyRhZApyhZEsWygYSxoxJBSgIvnXT00jhDe7xBm');


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