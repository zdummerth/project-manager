import stripe from 'stripe'
import isCurrency from 'validator/lib/isCurrency'

const key = process.env.NODE_ENV === 'production' ? (
    process.env.STRIPE_LIVE_RESTRICTED_KEY
) : (
    process.env.STRIPE_TEST_RESTRICTED_KEY
)
const stripeClient = stripe(key)

export default async (req, res) => {
    console.log('update payment intent called', req.body)
    const { amount, paymentIntentId } = req.body
    if (!amount || !paymentIntentId) {
        res.status(400).json({ error: 'Amount and paymentIntentId are required' })
    }
    else if (!isCurrency(amount + '')) {
        res.status(400).json({ error: 'Amount must be a valid usd currency' })
    } else {
        const hasDecimal = amount.includes('.')
        const newAmount = hasDecimal ? amount.replace('.', '') : amount + '00'
        const paymentIntent = await stripeClient.paymentIntents.update(paymentIntentId, {
            amount: newAmount
        })

        console.log('payment intent response', paymentIntent)

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            amount: paymentIntent.amount,
            id: paymentIntent.id,
            edit: false
        })
    }


}