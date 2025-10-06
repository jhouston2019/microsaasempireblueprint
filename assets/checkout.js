// Stripe Checkout Configuration for Micro-SaaS Empire Business Kit
// Single payment of $297

const STRIPE_CONFIG = {
    // Environment variables should be set in your deployment environment
    // STRIPE_PUBLISHABLE_KEY: 'pk_test_...' or 'pk_live_...'
    // STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT: 'price_...' (single payment product)
    // STRIPE_CHECKOUT_SUCCESS_URL: 'https://microsaasempireblueprint.com/success'
    // STRIPE_CHECKOUT_CANCEL_URL: 'https://microsaasempireblueprint.com/cancel'
    
    // For development, you can set these directly:
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here',
    priceId: process.env.STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT || 'price_your_price_id_here',
    successUrl: process.env.STRIPE_CHECKOUT_SUCCESS_URL || 'https://microsaasempireblueprint.com/success.html',
    cancelUrl: process.env.STRIPE_CHECKOUT_CANCEL_URL || 'https://microsaasempireblueprint.com/cancel.html'
};

// Initialize Stripe
let stripe;
if (typeof window !== 'undefined' && window.Stripe) {
    stripe = window.Stripe(STRIPE_CONFIG.publishableKey);
}

// Function to redirect to Stripe Checkout
function redirectToStripeCheckout() {
    if (!stripe) {
        console.error('Stripe not loaded');
        return;
    }

    // Create checkout session for single payment
    fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            priceId: STRIPE_CONFIG.priceId,
            successUrl: STRIPE_CONFIG.successUrl,
            cancelUrl: STRIPE_CONFIG.cancelUrl,
            mode: 'payment' // Single payment, not subscription
        })
    })
    .then(response => response.json())
    .then(session => {
        if (session.error) {
            console.error('Error creating checkout session:', session.error);
            return;
        }
        
        // Redirect to Stripe Checkout
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Alternative: Direct link to Stripe Payment Link (simpler approach)
function redirectToStripePaymentLink() {
    // This is a direct link to a Stripe Payment Link
    // You would create this in your Stripe Dashboard
    const paymentLink = 'https://buy.stripe.com/STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT';
    window.open(paymentLink, '_blank');
}

// Update all checkout buttons to use the new pricing
document.addEventListener('DOMContentLoaded', function() {
    // Update any existing checkout buttons
    const checkoutButtons = document.querySelectorAll('a[href*="buy.stripe.com"]');
    checkoutButtons.forEach(button => {
        button.href = 'https://buy.stripe.com/STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT';
        button.onclick = function(e) {
            e.preventDefault();
            redirectToStripePaymentLink();
        };
    });
});
