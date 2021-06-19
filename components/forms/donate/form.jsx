import React, { useState } from "react"
import isCurrency from 'validator/lib/isCurrency'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import Checkout from 'components/forms/donate/checkout'
// import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    // width: 100%;
`


const Form = styled.form`
    // width: 100%;
`

const InputContainer = styled(Flex)`
    // width: 200px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background: ${({ theme }) => theme.colors.inputBackground};
    padding: 5px;
`

const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  outline: none;
  font-size: 16px;
  flex: 1;
`

const ErrorMsg = styled.div`
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 10px;
`



const DonateForm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [amount, setAmount] = useState('')
    const [paymentIntent, setPaymentIntent] = useState({
        id: null,
        amount: null,
        clientSecret: null,
        edit: false
    })

    if(isCurrency(amount) && error) {
        setError(false)
    }

    // console.log('amount: ', amount)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submitting: ', amount)

        if(!isCurrency(amount)) {
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


        const paymentIntentRes = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                paymentIntentId: paymentIntent.id
            })
        })

        if (paymentIntentRes.ok) {
            const paymentIntent = await paymentIntentRes.json()
            // setClientSecret(paymentIntent.clientSecret)
            setPaymentIntent(paymentIntent)
            setLoading(false)
            console.log({ paymentIntent })
            // setAmount(paymentIntent.amount)
        } else {
            console.log('paymentIntentRes', paymentIntentRes)
            setLoading(false)
        }
    }

    return (
        <Container dir='column' ai='center'>
            {(paymentIntent.clientSecret && paymentIntent.amount && !paymentIntent.edit) ? (
                <Checkout
                    clientSecret={paymentIntent.clientSecret}
                    paymentIntentId={paymentIntent.id}
                    amount={paymentIntent.amount + ''}
                    setPaymentIntent={setPaymentIntent}
                />
            ) : (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Flex dir='column' ai='center'>
                            {error && (
                                <ErrorMsg>{error}</ErrorMsg>
                            )}
                            <InputContainer ai='center'>
                                <div>$</div>
                                <StyledInput
                                    type='text'
                                    id='amount'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </InputContainer>
                            <Button disabled={!amount || loading}>{loading ? <LoadingIndicator /> : 'Donate'}</Button>
                        </Flex>
                    </Form>
                </>
            )}
        </Container>
    )
}

export default DonateForm