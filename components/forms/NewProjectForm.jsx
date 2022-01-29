import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Input from 'components/shared/Inputs'
import Button, { BlankButton } from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'


const Form = styled.form`
    // max-width: 250px;
    display: flex;
`

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 10px;
  border: none;
  // margin-left: 10px;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.altBackground};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.brand};
    outline: none;
  }
`



export default function NewProjectForm({ createProject, loading }) {
    const router = useRouter()

    const [text, setText] = useState('')
    const [updating, setUpdating] = useState({
        loading: false,
        error: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createProject(text)
    }


    return (
        <Form onSubmit={handleSubmit}>
            <StyledInput
                name='project'
                id='project'
                placeholder='project name'
                value={text}
                error={updating.error}
                onChange={(e) => setText(e.target.value)}
            />
            <BlankButton>
                {
                    loading ? (
                        <LoadingIndicator />
                    ) : (
                        <div>
                            create
                        </div>
                    )
                }
            </BlankButton>
        </Form>
    )
}