import { Router } from 'express'
const stripe = require('stripe')('SECRET_KEY')
const router = Router()

router.post('/checkout', async (req: any, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
		  {
			price_data: {
			  currency: 'gbp',
			  product_data: {
				name: 'Basic Letter',
			  },
			  unit_amount: 2000,
			},
			quantity: 1,
		  },
		],
		mode: 'payment',
		success_url: 'http://localhost:3000/success',
		cancel_url: 'http://localhost:3000/cancel',
	  });
	res.json({url: session.url})
	} catch (err) {
    next(err)
  }
})

export default router

