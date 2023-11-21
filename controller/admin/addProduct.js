const Product = require('../../models/product')

exports.getAddProduct =  async (req, res, next)=>{
    const user = req.session.user
    try {
        if(user && user.pseudo == 'kaioshine78'){
            res.render('addProduct', {user})
        }else{
            res.redirect('/404')
        }
        
    } catch (error) {
        console.log(error)
    }
    
}
exports.postAddProduct = async (req, res, next)=>{
    const {name, price, image} = req.body
    try {
        const product = new Product({
            name: name,
            price: price,
            image: image
        })
        product.save()
        console.log('produit enregistrer avec succès !')
        res.redirect('/shop')        
    } catch (error) {
        console.log(error)
    }

}