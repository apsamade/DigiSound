const Product = require('../../models/product')
const Panier = require('../../models/panier')


exports.getConfirmPayement =  async (req, res, next)=>{
    const user = req.session.user
    const panierId = req.params.id
    const panier = await Product.findById(panierId)
    try {
        res.render('confirmPayement', {user, panier})
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