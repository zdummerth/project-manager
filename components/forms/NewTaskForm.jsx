import React, { useState } from 'react'
import styled from 'styled-components'
import { useProject } from 'lib/hooks'
import { useTasks } from 'lib/hooks'

import Input from 'components/shared/Inputs'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'


const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 250px;

    input {
        margin-bottom: 10px;
    }
`

const Label = styled.label`
    display: block;
    // margin-top: 20px;
`

const SubmitError = styled.div`
    color: red;
    margin: 20px 0;
`



export default function NewTaskForm({ projectId, status, userId }) {
    const {
        createTask,
        updating,
        error
    } = useTasks({
        projectId,
        userId,
        status,
    })
    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createTask(text)
        setText("")
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name='task'
                id='task'
                placeholder='add task'
                value={text}
                error={error}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                style={{
                    // marginTop: '15px',
                    width: '150px'
                }}
                outline
            >
                {
                    updating.creating ? (
                        <>
                            <LoadingIndicator />
                        </>
                    ) : (
                        <>
                            create task
                        </>
                    )
                }
            </Button>
        </Form>
    )
}