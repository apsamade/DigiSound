const Product = require('../../models/product')
const Panier = require('../../models/panier')
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
        const panierExisting = await Panier.findOne({userId: user._id})
        if(user && !panierExisting){
            const panier = new Panier ({
                userId: user._id,
                produitId: produit._id,
                price: produit.price
            })
            await panier.save()
        }else if(user && panierExisting){
            panierExisting.price += produit._id;
        }else{
            res.redirect('/sign-in')
        }

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