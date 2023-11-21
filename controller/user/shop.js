const Product = require('../../models/product')

exports.getShop = async (req, res, next) => {
    const user = req.session.user
    const produits = await Product.find()
    try {
        res.render('shop', { user, produits })
    } catch (error) {
        console.log(error)
    }

}
exports.postShop = async (req, res, next) => {

}