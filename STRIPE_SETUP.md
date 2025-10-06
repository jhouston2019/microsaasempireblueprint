# Stripe Setup Instructions for Micro-SaaS Empire Business Kit

## Overview
This project has been updated to use a single payment of $297 for the Micro-SaaS Empire Business Kit.

## Stripe Configuration

### 1. Create a Single Payment Product in Stripe Dashboard

1. Log into your Stripe Dashboard
2. Go to **Products** → **Add Product**
3. Create a new product with these settings:
   - **Name**: "Micro-SaaS Empire Business Kit"
   - **Description**: "Complete blueprint with proven strategies, tools, and resources to build your digital empire"
   - **Pricing**: $297.00 USD
   - **Billing**: Single payment (not recurring)
4. Save the product and copy the **Price ID** (starts with `price_`)

### 2. Environment Variables

Set these environment variables in your deployment platform (Netlify, Vercel, etc.):

```bash
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT=price_your_price_id_here
STRIPE_CHECKOUT_SUCCESS_URL=https://microsaasempireblueprint.com/success.html
STRIPE_CHECKOUT_CANCEL_URL=https://microsaasempireblueprint.com/cancel.html
```

### 3. Update the Checkout Link

Replace `STRIPE_PRICE_MICRO_SAAS_EMPIRE_KIT` in the HTML with your actual Stripe Price ID:

```html
<!-- In index.html, line 276 -->
<a href="https://buy.stripe.com/YOUR_ACTUAL_PRICE_ID" class="cta-button primary" target="_blank">
    Get Instant Access — $297
</a>
```

### 4. Test the Integration

1. Use Stripe's test mode first
2. Test the checkout flow with test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Verify redirects work correctly
4. Switch to live mode when ready

## Payment Mode Configuration

The checkout is configured for **single payments** (`mode: "payment"`), not subscriptions. This ensures customers pay $297 once and get lifetime access.

## Success and Cancel Pages

The following pages are included in this repository:
- `success.html` - Complete resource center with all course materials and downloads
- `cancel.html` - Re-engagement page to encourage customers to complete their purchase

These pages provide:
- **Success Page**: Full access to all course materials, templates, community access, and next steps
- **Cancel Page**: Reasons to complete purchase, value proposition, and easy return to checkout

## Files Updated

- `index.html` - Updated pricing section to single $297 option
- `assets/style.css` - Added styles for single pricing card
- `assets/checkout.js` - Stripe integration script
- `STRIPE_SETUP.md` - This setup guide

## Next Steps

1. Set up your Stripe account and create the product
2. Update the environment variables
3. Replace the placeholder Price ID in the HTML
4. Test the checkout flow
5. Deploy to production
