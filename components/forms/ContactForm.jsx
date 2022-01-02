import React, { useState } from 'react'
import styled from 'styled-components'
import isEmail from 'validator/lib/isEmail'
import Input from 'components/shared/Inputs'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'

const Container = styled(Flex)``

const Form = styled.form`
  border: 1px solid gray;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [error, setError] = useState({
        email: null,
        name: null,
        message: null
    })
    const [formState, setFormState] = useState({
        email: '',
        name: '',
        message: ''
    })

    const resetError = () => setError({
        email: null,
        name: null,
        message: null
    })

    const handleChange = e => {
        e.preventDefault()
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}

        if (!isEmail(formState.email)) {
            err.email = '* Must be valid email address'
        }


        if (err.email) {
            setError(err)
            return
        } else {
            console.log({ formState })
            resetError()
            setSubmitted(false)
            setSubmitError(false)
            setIsSubmitting(true)
            const response = await fetch('/api/fauna/submit-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })

            if (response.ok) {
                setSubmitted(true)
                setFormState({
                    email: '',
                    name: '',
                    message: ''
                })
            } else {
                setSubmitError(true)
            }
            setIsSubmitting(false)
        }
    }

    console.log({ error })

    return (
        <Container dir='column' ai='center'>
            <h1>Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    name='name'
                    id='name'
                    placeholder='name'
                    onChange={handleChange}
                    value={formState.name}
                    error={error.name}
                    label='Name'
                    required
                />
                <Input
                    name='email'
                    id='email'
                    placeholder='email'
                    onChange={handleChange}
                    value={formState.email}
                    error={error.email}
                    label='Email'
                />
                <Input
                    as='textarea'
                    name='message'
                    id='message'
                    placeholder='message'
                    onChange={handleChange}
                    value={formState.message}
                    error={error.message}
                    required={true}
                    label='Message'
                    rows='5'
                    cols='50'
                />
                <StyledButton
                    // disabled={formState.email === '' || formState.name === '' || formState.message === ''}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <LoadingIndicator />
                    ) : <>Submit</>}
                </StyledButton>
                {submitted && (
                    <div style={{ margin: '20px' }}>Thank you for the message. We'll get back to you soon.</div>
                )}
                {submitError && (
                    <div style={{ margin: '20px', color: 'red' }}>There was an error submitting your message. Please try again.</div>
                )}
            </Form>
        </Container>
    )
}