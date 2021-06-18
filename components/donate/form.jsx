import Link from 'next/link'
import React, { useState, useEffect } from "react"
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    width: 100%;
`

const CardContainer = styled.div`
    // width: 100%;
    padding: 5px;
    // border: 1px solid white;
`

const Form = styled.form`
    width: 100%;
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
            // color: "#fa755a",
            // iconColor: "#fa755a"
        },
        empty: {
            // color: "white",
            // iconColor: "white"
        }
    }
};

const DonateForm = () => {
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [amount, setAmount] = useState('2.44')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const loadingStripe = !stripe || !elements

    console.log('stripe', stripe)


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loadingStripe) return

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        const paymentIntent = await fetch("/api/stripe/create-paymentIntent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        })

        if (paymentIntent.clientSecret) {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement
                }
            })

            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
                setProcessing(false);
            } else {
                setError(null);
                setProcessing(false);
                setSucceeded(true);
            }

        } else {
            console.log('[error]', error)
        }
    }

    if (error) {
        return (
            <Flex>There was an error processing your payment</Flex>
        )
    }

    if (processing) {
        return (
            <LoadingIndicator />
        )
    }

    if (succeeded) {
        return (
            <Flex>Thank you for the dough</Flex>
        )
    }
    return (
        <Container>
            <Form action="">
                <CardContainer>
                    <CardElement options={cardStyle} />
                </CardContainer>
                <Button disabled={!stripe}>Donate</Button>
            </Form>
        </Container>
    )
}

export default DonateForm