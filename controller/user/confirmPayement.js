const Panier = require('../../models/panier')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const panier = await Panier.findById(panierId)

    try {
        if(panier && session.payment_status){
            panier.payer = true;
            await panier.save()
            console.log('panier save : ', panier.payer)
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