import { verifyWebhookSig } from './helpers/verifyStripeWebhook'

const mainFlow = async (customerEmail: string | null | undefined) => {
  if (!customerEmail) throw new Error('Stripe customer email not found')
  console.log('Signed up: ', customerEmail)
}

export const handler = async (event: any) => {

  console.log(event);

  const stripeEvent = await verifyWebhookSig(event)
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      await mainFlow(stripeEvent.data.object.customer_details?.email)
      console.log('Checkout session completed');
  }
  return 'Hello, World!'
}
