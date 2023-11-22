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
    const user = req.session.user
    const produit = await Product.findById(productId)
    try {
        if(user){
            const panierExisting = await Panier.findOne({userId: user._id, produitId: produit._id, payer: false})
            if(!panierExisting){
                const panier = new Panier ({
                    userId: user._id,
                    produitId: produit._id,
                    price: produit.price
                })
                await panier.save()
                res.redirect(`/panier/${panier._id}`)
            }else{
                res.redirect(`/panier/${panierExisting._id}`)
            }         
        }
    } catch (error) {
        console.log(error)
    }
}