// This is your test publishable API key.
const stripe = Stripe("pk_test_51NOT07FkFyJ92wXRSJsecdylcz94LHhkpl9rpkuTV4ie2XtL0o8nCCgtUGFRV0fBGyb8BmwETsVFxa8rhCcAENw800xOtEKheW");

const currentPath = window.location.pathname;
const idMatch = currentPath.match(/\/([a-fA-F0-9]{24})/);
const id = idMatch ? idMatch[1] : null;
initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
    const response = await fetch(`/panier/${id}`, {
        method: "POST",
    });

    const { clientSecret } = await response.json();

    const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
    });

    // Mount Checkout
    checkout.mount('#checkout');
}