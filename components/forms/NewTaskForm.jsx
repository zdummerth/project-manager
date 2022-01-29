import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useProject } from 'lib/hooks'
import Flex from 'components/shared/Flex'

import Input from 'components/shared/Inputs'
import { BlankButton } from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Plus, X } from '@styled-icons/boxicons-regular'



const Form = styled.form`
    display: flex;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.brand};
    // flex-direction: column;
    align-items: center;
    // max-width: 250px;

    i {
        color: #606060;
        margin-right: 8px;
    }
`

const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0;
  padding: 10px;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.brand};
  
  flex: 1;

  :focus {
      outline: none;
  }

`

const SubmitError = styled.div`
    color: red;
    margin: 20px 0;
`



export default function NewTaskForm({
    projectId,
    status,
    userId,
    close,
    loading,
    createTask
}) {
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus();
    })

    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createTask(text, status)
        setText("")
    }


    return (
        <Form onSubmit={handleSubmit}>
            <BlankButton type='button' onClick={close}>
                <Flex>
                    <X size='22' />
                </Flex>
            </BlankButton>
            <BlankButton>
                <Flex>
                    <Plus size='22' />
                </Flex>
            </BlankButton>
            <StyledInput
                name='task'
                id='task'
                placeholder='add task'
                value={text}
                onChange={(e) => setText(e.target.value)}
                ref={inputRef}
            />
            {loading ? (
                <LoadingIndicator />
            ) : (
                <i>{status}</i>
            )}
        </Form>
    )
}