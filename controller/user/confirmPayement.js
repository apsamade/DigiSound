const Product = require('../../models/product')
const Panier = require('../../models/panier')


exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)

    console.log('panier id', panierId)
    console.log(user._id)
    console.log('panier recupérer', panier)
    try {
        if(panier && panier.payer == true){
            res.render('confirmPayement', {user, panier})
        }else{
            res.render('confirmPayement', {user, panier, err: 'panier non payer une erreur est survenue !'})
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