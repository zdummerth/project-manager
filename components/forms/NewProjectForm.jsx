import React, { useState } from 'react'
import styled from 'styled-components'
import { BlankButton } from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Plus, Album } from '@styled-icons/boxicons-regular'

const Form = styled.form`
    display: flex;
    width: 100%;
`

export default function NewProjectForm({ createProject, loading }) {
    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === "") return
        await createProject(text)
        setText('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input
                name='project'
                className='bg'
                id='project'
                placeholder='new project'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <BlankButton disabled={loading} className={`${loading && 'rotate'}`}>
                {loading ? <Album size='20' /> : <Plus size='20' />}
            </BlankButton>
        </Form>
    )
}