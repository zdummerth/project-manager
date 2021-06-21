import { useState } from 'react'
import isCurrency from 'validator/lib/isCurrency'
import fetcher from 'lib/fetcher'
import View from './View'

const DonateFormControls = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [amount, setAmount] = useState('')
    const [paymentIntent, setPaymentIntent] = useState({
        id: null,
        amount: null,
        clientSecret: null,
        edit: false
    })

    if (isCurrency(amount) && error) {
        setError(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submitting: ', amount)

        if (!isCurrency(amount)) {
            console.log('amount is not a currency ')
            setError('Must be a valid USD currency, e.g. 5, 5.00')
            return
        }

        setLoading(true)

        const url = paymentIntent.edit ? (
            '/api/stripe/update-paymentIntent'
        ) : (
            '/api/stripe/create-paymentIntent'
        )

        const body = {
            amount,
            paymentIntentId: paymentIntent.id
        }

        const { data, error } = await fetcher({ url, body })


        if (data) {
            setPaymentIntent(data)
        } else {
            console.log('error', error)
        }

        setLoading(false)

    }

    return (
        <View
            loading={loading}
            error={error}
            amount={amount}
            paymentIntent={paymentIntent}
            setAmount={setAmount}
            setPaymentIntent={setPaymentIntent}
            handleSubmit={handleSubmit}
        />
    )
}

export default DonateFormControls