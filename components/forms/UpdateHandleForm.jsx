import React, { useState } from 'react'
import styled from 'styled-components'
import { useUser } from 'lib/hooks'
import Input from 'components/shared/Inputs'
import Button from 'components/shared/Button'
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



export default function UpdateHandleForm({
    onSubmit,
    initHandle,
    loading,
    close
}) {
    const [text, setText] = useState(initHandle)
    const handleSubmit = async e => {
        e.preventDefault()
        await onSubmit(text)
        close()
    }

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <Input
                    name='task'
                    id='task'
                    placeholder='add task'
                    value={text}
                    // error={error}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    style={{
                        // marginTop: '15px',
                        width: '150px'
                    }}
                >
                    {
                        loading ? (
                            <>
                                <LoadingIndicator />
                            </>
                        ) : (
                            <>
                                change handle
                            </>
                        )
                    }
                </Button>
            </Form>
        </>
    )
}