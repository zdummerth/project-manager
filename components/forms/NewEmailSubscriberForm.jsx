import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import isEmail from 'validator/lib/isEmail'
import Input from 'components/shared/Inputs'
import Button from 'components/shared/Button'
import Loading from 'components/shared/LoadingIndicator'
import LoadingIndicator from 'components/shared/LoadingIndicator'


const Form = styled.form`
    max-width: 250px;
`

const Label = styled.label`
    display: block;
    // margin-top: 20px;
`

const SubmitError = styled.div`
    color: red;
    margin: 20px 0;
`



export default function EmailSubscriberForm({ reset }) {

    // console.log('reset', reset)

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [submitting, setSubmitting] = useState(null)
    const [submitted, setSubmitted] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('email submitted', email)
        if (!isEmail(email)) {
            setError('* Must be a valid email')
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/fauna/submit-email-subscriber', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            console.log('client res for new email sub', res)

            if (!res.ok) {
                throw new Error('an error adding contact')
            }

            setSubmitted(true)
            setError("")

        } catch (err) {
            console.log({ err })
            setError("Unable To Connect. Try Again")
        } finally {
            setSubmitting(false)
        }

    }


    useEffect(() => {
        if (reset) {
            setSubmitted(false)
        }
    }, [reset])


    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor='email'>
                {submitError ? (
                    <SubmitError>
                        There was an error, please try again
                    </SubmitError>
                ) : (
                    <i>
                        Sign up to receive emails about
                        our latest products and events
                    </i>
                )}
            </Label>
            <>
                <>
                    <div style={{ marginTop: '10px', height: '15px', color: "red", fontSize: '14px'}}>
                        {error && error}
                    </div>
                    <Input
                        name='email'
                        id='email'
                        placeholder='email'
                        value={email}
                        error={error}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div style={{ margin: '5px 0', height: '20px' }}>
                        {submitted && "Thank you for signing up!"}
                    </div>
                    <Button
                        style={{
                            // marginTop: '15px',
                            width: '100px'
                        }}
                    >
                        {
                            submitting ? (
                                <>
                                    <LoadingIndicator />
                                </>
                            ) : (
                                <>
                                    Subscribe
                                </>
                            )
                        }
                    </Button>
                </>
            </>

        </Form>
    )
}