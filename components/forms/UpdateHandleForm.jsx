import React, { useState } from 'react'
import styled from 'styled-components'
import Button, { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import LoadingIndicator from 'components/shared/LoadingIndicator'


const Form = styled.form`
    #btns {
        opacity: ${({ showBtns }) => showBtns ? '1' : '0'};
    }
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

    const disabled = text === initHandle || loading
    const showBtns = text !== initHandle

    return (
        <>
            <Form onSubmit={handleSubmit} showBtns={showBtns}>
                <Flex ai='center'>
                    <input
                        name='handle'
                        id='handle'
                        placeholder='handle'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Flex id='btns' ai='center' id='btns'>
                        <BlankButton disabled={disabled}>
                            save
                        </BlankButton>
                        <BlankButton disabled={disabled} type='button' onClick={() => setText(initHandle)}>
                            cancel
                        </BlankButton>
                    </Flex>
                </Flex>
            </Form>
        </>
    )
}