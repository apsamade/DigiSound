const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE);
const endpointSecret = process.env.SECRET_WEBHOOK_KEY_STRIPE;

const Panier = require('../../models/panier')
const Product = require('../../models/product')
const User = require('../../models/user')

const fulfillOrder = (lineItems) => {
    // TODO: fill me in
    console.log("Fulfilling order", lineItems);
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

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.async_payment_succeeded') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
        );
        const lineItems = sessionWithLineItems.line_items;

        // Fulfill the purchase...
        fulfillOrder(lineItems);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();

}