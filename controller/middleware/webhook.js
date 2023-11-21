const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE);
const endpointSecret = process.env.SECRET_WEBHOOK_KEY_STRIPE;

const Panier = require('../../models/panier')
const Product = require('../../models/product')
const User = require('../../models/user')


exports.handleWebhook = async (req, res, next) => {
    const user = req.session.user;
    console.log(req.session)
    const sig = req.headers['stripe-signature'];
    
    console.log(user)
    // const panier = await Panier.findOne({userId: user._id, payer: false})
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    
        // Ajoutez un log ici pour afficher l'utilisateur après la construction de l'événement
        console.log('User (after event construction):', req.session.user);
    } catch (err) {
        console.error('Erreur lors de la construction de l\'événement:', err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    console.log('User (after try-catch):', req.session.user);
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('paiement effectuer avec succès', paymentIntentSucceeded.status)
            // if(user && panier){
            //     panier.payer = true;
            // }
            // await panier.save()
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();

}