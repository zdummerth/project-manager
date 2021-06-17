import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Button from 'components/shared/Button'

const Form = styled.form`
  width: 100%;
`
const TextArea = styled.textarea`
  margin-bottom: 10px;
  width: 100%;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 8px;
`

const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray};

`

const Label = styled.label`
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`

const CommentForm = () => {
    const [comment, setComment] = useState('')
    const [alias, setAlias] = useState('')

    const handleSubmit = async () => {
        const uploaded = await fetch('/api/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment,
                alias
            })
        })

        console.log('uploaded', uploaded)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Flex dir='column' ai='center'>
                <Label htmlFor='alias'>Alias</Label>
                <Input
                    id='alias'
                    name='alias'
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    type='text'
                />
                <Label htmlFor='comment'>Thoughts</Label>
                <TextArea
                    id='comment'
                    name='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows='8'
                />
                <Button>Submit</Button>
            </Flex>
        </Form>
    )
}

export default CommentForm