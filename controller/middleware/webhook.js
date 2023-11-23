const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE);
const endpointSecret = process.env.SECRET_WEBHOOK_KEY_STRIPE;

const Panier = require('../../models/panier')
const Product = require('../../models/product')
const User = require('../../models/user')

const fulfillOrder = async (lineItems) => {
    try {
        const panier = await Panier.findById(req.params.id)
        panier.payer = true;
        await panier.save()
        console.log('panier payer : ', panier.payer)
    } catch (error) {
        console.log(error)
    }
    console.log("Fulfilling order", lineItems);
}
const createOrder = (session) => {
    // TODO: fill me in
    console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
}
exports.handleWebhook = async (req, res, next) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            createOrder(session);
            if (session.payment_status === 'paid') {
                await fulfillOrder(session);
            }

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;

            // Fulfill the purchase...
            await fulfillOrder(session);

            break;
        }

        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
            emailCustomerAboutFailedPayment(session);

            break;
        }
    }


    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();

}