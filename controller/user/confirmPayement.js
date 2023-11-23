const Panier = require('../../models/panier')


exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Panier.findById(panierId)

    try {
        if(panier){
            console.log(req.query.session_id)
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