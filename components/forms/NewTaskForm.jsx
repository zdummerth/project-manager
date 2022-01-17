import React, { useState } from 'react'
import styled from 'styled-components'
import { useProject } from 'lib/hooks'
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



export default function NewTaskForm({ projectId }) {
    const { createTask } = useProject(projectId)

    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch('/api/fauna/task/create', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    project: projectId,
                    name: text,
                })
            })

            const newTask = await res.json()

            await createTask(newTask)
            setError("")
            setText("")
        } catch (err) {
            setError("Unable To Connect. Try Again")
        } finally {
            setSubmitting(false)
        }
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
            >
                {
                    submitting ? (
                        <>
                            <LoadingIndicator />
                        </>
                    ) : (
                        <>
                            Create Task
                        </>
                    )
                }
            </Button>
        </Form>
    )
}