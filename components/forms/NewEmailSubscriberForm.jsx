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
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(null)
    const [submitted, setSubmitted] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
                const { error } = await res.json()
                throw error
            }

            setSubmitted(true)
            setError("")
            setEmail("")

        } catch (err) {
            console.log(err.trim())
            if (err === ('Instance is not unique.')) {
                setError('Email is already subscribed')
            } else {
                setError("Unable To Connect. Try Again")
            }
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
                <i>
                    Sign up to receive emails about
                    our latest products and events
                </i>
            </Label>
            <>
                <>
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