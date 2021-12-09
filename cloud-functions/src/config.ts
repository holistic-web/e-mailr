export default {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    redirectBaseUrl: process.env.STRIPE_REDIRECT_BASE_URL, // TODO: configure this for live and dev
  },
  lob: {
    publishableKey: process.env.LOB_PUBLISHABLE_KEY,
    secretKey: process.env.LOB_SECRET_KEY,
  }
};
