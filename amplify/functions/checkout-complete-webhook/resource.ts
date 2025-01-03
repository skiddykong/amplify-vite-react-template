import { defineFunction, secret } from '@aws-amplify/backend'

export const stripeCheckoutSongFunc = defineFunction({
  name: 'stripe-checkout-song',
  entry: './handler.ts',
  environment: {
    STRIPE_SECRET: secret('stripe-secret'),
    STRIPE_WEBHOOK_SECRET: secret('stripe-webhook')

  },
})
