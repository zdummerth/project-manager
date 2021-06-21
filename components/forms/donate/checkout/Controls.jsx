import { useState } from 'react'
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import View from './View'

const DonateCheckoutControls = ({
    clientSecret,
    amount,
    setPaymentIntent
}) => {
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const stripe = useStripe()
    const elements = useElements()
    const loadingStripe = !stripe || !elements

    const formattedPrice = `${amount.slice(0, -2)}.${amount.slice(-2)}`

    const handleCardChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        if (loadingStripe) {
            return
        }
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    return (
        <View
            processing={processing}
            succeeded={succeeded}
            error={error}
            amount={formattedPrice}
            setPaymentIntent={setPaymentIntent}
            handleSubmit={handleSubmit}
            disabled={disabled}
            CardElement={CardElement}
            stripe={stripe}
            handleCardChange={handleCardChange}
        />
    )
}

export default DonateCheckoutControls