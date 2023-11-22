const Product = require('../../models/product')
const Panier = require('../../models/panier')


exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Product.findById(panierId)
    console.log(panier)
    try {
        if(panier.payer){
            res.render('confirmPayement', {user, panier})
        }else{
            res.render('confirmPayement', {user, panier, panierNonPayer: 'panier non payer une erreur est survenue !'})
        }
        
    } catch (error) {
        console.log(error)
    }
}
exports.postConfirmPayement = async (req, res, next)=>{
    try {

    } catch (error) {
        console.log(error)
    }
}