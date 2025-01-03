import Stripe from 'stripe'
import { env } from '$amplify/env/stripe-checkout-song'

type StripeEvent = {
	headers: {
		'stripe-signature': string
	}
	body: string
}

export const verifyWebhookSig = async (event: StripeEvent) => {
	const stripe = new Stripe(env.STRIPE_WEBHOOK_SECRET)
	const sig = event.headers['stripe-signature']
	try {
		const stripeEvent = stripe.webhooks.constructEvent(
			event.body,
			sig,
			env.STRIPE_SECRET
		)
		return stripeEvent
	} catch (err) {
		console.log('uh oh', err)
		throw Error('Invalid signature')
	}
}
