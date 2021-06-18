import Link from 'next/link'
import React, { useState, useEffect } from "react"
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import isCurrency from 'validator/lib/isCurrency'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import Input from 'components/shared/Inputs'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import Checkout from 'components/forms/donate/checkout'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    width: 100%;
`

const CardContainer = styled.div`
    // width: 90%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid white;
    border-radius: 5px;
`

const Form = styled.form`
    width: 90%;
`

const cardStyle = {
    style: {
        base: {
            color: "white",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "white"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        },

    }
};

const DonateForm = () => {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [paymentIntent, setPaymentIntent] = useState({})
    const stripe = useStripe()
    const elements = useElements()
    const loadingStripe = !stripe || !elements

    console.log('amount: ', amount)

    const handleChange = event => {
        event.preventDefault()
        // const inCents = event.target.value.replace('.', '')
        const trimChar = (string, charToRemove) => {
            while (string.charAt(0) == charToRemove) {
                string = string.substring(1);
            }

            return string;
        }

        setAmount(trimChar(event.target.value, '0'))
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (loadingStripe) return
        setLoading(true)

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.

        // setProcessing(true)
        const paymentIntentRes = await fetch("/api/stripe/create-paymentIntent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        })

        if (paymentIntentRes.ok) {
            const paymentIntent = await paymentIntentRes.json()
            // setClientSecret(paymentIntent.clientSecret)
            setPaymentIntent(paymentIntent)
            console.log({ paymentIntent })
            // setAmount(paymentIntent.amount)
        } else {
            console.log('paymentIntentRes', paymentIntentRes)
            setLoading(false)
        }

    }

    return (
        <Container dir='column' ai='center'>
            {paymentIntent.clientSecret ? (
                <Checkout clientSecret={paymentIntent.clientSecret} amount={paymentIntent.amount + ''} />
            ) : (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            id='amount'
                            label='Amount'
                            value={amount}
                            onChange={handleChange}
                        // onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button disabled={!amount || loading}>{loading ? <LoadingIndicator /> : 'Donate'}</Button>
                    </Form>
                </>
            )}
        </Container>
    )
}

export default DonateForm