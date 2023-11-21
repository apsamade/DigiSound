const stripe = require('stripe')('sk_test_...');

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_260da5d7710be86bd315c27f05e6711a94fc5667afe1d86117f916092fa9beb5";

exports.handleWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('paiement effectuer avec succès', paymentIntentSucceeded)
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();

}