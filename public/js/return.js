initialize();

const currentPath = window.location.pathname;
const idMatch = currentPath.match(/\/([a-fA-F0-9]{24})/);
const id = idMatch ? idMatch[1] : null;

async function initialize() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const response = await fetch(`/shop/produit/${id}/session-status?session_id=${sessionId}`);
    const session = await response.json();

    if (session.status == 'open') {
        window.replace(`https://digisound.onrender.com/shop/produit/${id}`)
    } else if (session.status == 'complete') {
        document.getElementById('success').classList.remove('hidden');
        document.getElementById('customer-email').textContent = session.customer_email
    }
}