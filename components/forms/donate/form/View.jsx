import React, { useState } from 'react'
import isCurrency from 'validator/lib/isCurrency'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import Checkout from 'components/forms/donate/checkout/Controls'
// import { dimensions, colors } from 'styles'

const Container = styled(Flex)``

const Form = styled.form``

const InputContainer = styled(Flex)`
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



const DonateForm = ({
    loading,
    error,
    amount,
    paymentIntent,
    setAmount,
    setPaymentIntent,
    handleSubmit
}) => {

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