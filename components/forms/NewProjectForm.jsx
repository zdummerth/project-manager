import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useProject } from 'lib/hooks'
import { useTasks } from 'lib/hooks'

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



export default function NewProjectForm() {
    const router = useRouter()

    const [text, setText] = useState('')
    const [updating, setUpdating] = useState({
        loading: false,
        error: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating({
            loading: true,
            error: null
        })
        try {
            const response = await fetch('/api/fauna/project/create', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: text
                })
            })

            const newTask = await response.json()
            console.log('new project', newTask)

            setUpdating({
                loading: false,
                error: null
            })
            setText("")
            // router.push(`/projects/${newTask._id}`)
            // return [...prev, newTask]
        } catch (e) {
            console.log('err', e)
            setUpdating({
                loading: false,
                error: e
            })
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name='project'
                id='project'
                placeholder='project name'
                value={text}
                error={updating.error}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                style={{
                    // marginTop: '15px',
                    width: '150px'
                }}
            >
                {
                    updating.loading ? (
                        <>
                            <LoadingIndicator />
                        </>
                    ) : (
                        <>
                            Create Project
                        </>
                    )
                }
            </Button>
        </Form>
    )
}