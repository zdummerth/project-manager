import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'

const Container = styled(Flex)`
    width: 100%;
`

const CardContainer = styled.div`
    padding: 8px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid white;
    border-radius: 5px;
`

const Form = styled.form`
    width: 90%;
`

const Amount = styled.div`
    margin: 8px;
    font-weight: bold;
`

const PlainButton = styled.button`
    align-self: flex-end;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.text};
    padding: 5px;
    margin: 8px;
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
}

const CheckoutView = ({
    processing,
    error,
    amount,
    succeeded,
    setPaymentIntent,
    handleSubmit,
    disabled,
    CardElement,
    stripe,
    handleCardChange
}) => {
    return (
        <Container dir='column' ai='center'>
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Flex jc='center' role="alert">
                        {error}
                    </Flex>
                )}

                {succeeded ? (
                    <Flex jc='center'>Thanks for the dough</Flex>
                ) : (
                    <>
                        <Flex ai='center'>
                            <Amount>
                                {`Amount: $${amount}`}
                            </Amount>
                            <PlainButton type='button' onClick={() => setPaymentIntent(prev => ({ ...prev, edit: true }))}>Edit</PlainButton>
                        </Flex>
                        <CardContainer>
                            <CardElement options={cardStyle} onChange={handleCardChange} />
                        </CardContainer>
                        <Button disabled={!stripe || processing || disabled || succeeded}>
                            {processing ? (
                                <LoadingIndicator />
                            ) : (
                                'Pay Now'
                            )}
                        </Button>
                    </>
                )}
            </Form>
        </Container>
    )
}

export default CheckoutView