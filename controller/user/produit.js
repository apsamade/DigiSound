const Product = require('../../models/product')
const Panier = require('../../models/panier')
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);
const YOUR_DOMAIN = 'https://digisound.onrender.com';


exports.getProduit = async (req, res, next) => {
    const user = req.session.user
    const productId = req.params.id
    const produit = await Product.findById(productId)

    try {
        res.render('produit', { user, produit })
    } catch (error) {
        console.log(error)
    }
}
exports.postProduit = async (req, res, next) => {
    const productId = req.params.id
    const user = req.session.user
    const produit = await Product.findById(productId)
    try {
        const panierExisting = await Panier.findOne({ userId: user._id })
        if (user && !panierExisting) {
            const panier = new Panier({
                userId: user._id,
                produitId: produit._id,
                price: produit.price
            })
            await panier.save()
        } else if (user && panierExisting) {
            panierExisting.price += produit._id;
        } else {
            return res.redirect('/sign-in')
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1OFCGgFkFyJ92wXRTS6PHrGi',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${YOUR_DOMAIN}/shop/produit/${productId}/confirm-payement?session_id=${user._id}`,
        });

        res.send({ clientSecret: session.client_secret });

    } catch (error) {
        console.log(error)
    }
}

exports.getStatusSession = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email
    });
}