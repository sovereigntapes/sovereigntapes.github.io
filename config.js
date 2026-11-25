// Fill these in from Supabase > Project Settings > API. The anon key is safe to ship in the app;
// the database rules in supabase/schema.sql are what protect the data.
window.APP_CONFIG = {
  SUPABASE_URL: 'https://lkrmavchcakogjhsgqzc.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrcm1hdmNoY2Frb2dqaHNncXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5NjA0MzgsImV4cCI6MjExMDUzNjQzOH0.7HHXKyANLCl4dcdFF0YUX_N2HlEH4mNbNdap6mgjo5M',
  // Public web address of SovereignTapes, used by "Copy link". Leave blank until you host the web version.
  SHARE_URL: 'https://sovereigntapes.com',
  // Sponsorships: a Stripe Payment Link (stripe.com > Payment Links) artists pay through before requesting.
  // Leave blank to collect payment yourself; requests still arrive on the Admin page.
  // Each package gets its own Stripe Payment Link (one-time payment). Paid sponsorships turn on automatically.
  // With no link, artists send a request and you approve it on the Admin page.
  SPONSOR_PACKAGES: [{ days: 7, price: '$25', link: 'https://buy.stripe.com/test_28E14m4b72UT2yg7uBgYU01' }, { days: 30, price: '$75', link: 'https://buy.stripe.com/test_5kQ3cu7nj7b9egYcOVgYU02' }],
  // SovereignTapes Plus: a Stripe Payment Link for a monthly subscription, and your Stripe customer portal link.
  PLUS_PAYMENT_LINK: 'https://buy.stripe.com/test_7sYcN4dLHgLJa0I2ahgYU00', // test mode: swap for live links when you go live
  PLUS_PRICE: '$4.99/month',
  PLUS_MANAGE_LINK: 'https://billing.stripe.com/p/login/test_7sYcN4dLHgLJa0I2ahgYU00',
  // Show purchases and payouts in the iPhone/Android apps too (same features as the website). Checkout opens in the
  // phone's browser through Stripe. Store rules on outside payment links differ by country: see README before release.
  SHOW_PURCHASES_IN_APPS: true,
  // Money features (amounts charged are set in supabase/functions/pay/index.ts; these are only the labels shown)
  PRO_PRICE: '$9.99/month',
  VERIFY_PRICE: '$10.99/month', // Verified badge (price itself is set in the pay function)
  // Website ads (Google AdSense). Paste your publisher id (ca-pub-...) and an ad unit slot id. Blank = no ads. Plus members never see ads.
  ADSENSE_CLIENT: '',
  ADSENSE_SLOT: '',
  // Badge tiers by streams + downloads: [minimum, name, color]. Highest first.
  BADGES: [[200000, '2x Platinum', '#e9e7ff'], [100000, 'Platinum', '#d7dde2'], [25000, 'Gold', '#f5c542'], [5000, 'Silver', '#c3c8d0'], [1000, 'Bronze', '#d08a4e']]
};
