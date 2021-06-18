import stripe from 'stripe'
import isCurrency from 'validator/lib/isCurrency'

export default async (req, res) => {
    console.log('create payment intent called', req.body)
    const { amount } = req.body
    if (!amount) {
        res.status(400).json({ error: 'Amount is required' })
    }
    else if (!isCurrency(amount + '')) {
        res.status(400).json({ error: 'Amount must be a valid usd currency' })
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd"
        });

        console.log('payment intent response', paymentIntent)

        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    }


}