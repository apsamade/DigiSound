const Panier = require('../../models/panier')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)

    // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // cette constante permet de recupérer la session stripe avec les information de la session (meta donné status du paiement etc utilie simple pratique)
    
    try {
        if(panier && panier.payer){
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