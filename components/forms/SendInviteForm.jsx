import React, { useState } from 'react'
import styled from 'styled-components'
import { useInvites, useAllUsers } from 'lib/hooks'
import { CheckDouble } from '@styled-icons/boxicons-regular'
import Input from 'components/shared/Inputs'
import { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
// import LoadingIndicator from 'components/shared/LoadingIndicator'


const Form = styled.form`
    // max-width: 250px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    .suggestions {
        width: 100%;

        & > * {
            padding: 10px;
            border: 1px solid gray;
            width: 100%;
        }
    }
`

const StyledInput = styled.input`
  padding: 5px 10px 5px 0;
  border-radius: 10px;
  border: none;
  padding: 8px;
  margin: 10px;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.altBackground};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.brand};
    outline: none;
  }
`

export default function SendInviteForm({
    loading,
    projectId,
    userId
}) {
    const { users } = useAllUsers()
    const { sendInvites, invites } = useInvites()
    const [text, setText] = useState("")

    const handleSubmit = async (e, u) => {
        e.preventDefault()
        try {
            await sendInvites([u._id], projectId)
        } catch (e) {

        }
    }

    const filteredUsers = users ?
        users.data.filter(u => u.handle.includes(text) && text !== "" && u._id !== userId)
        : []

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <StyledInput
                    name='invites'
                    id='invites'
                    placeholder='search users'
                    value={text}
                    // error={error}
                    onChange={(e) => setText(e.target.value)}
                />
                <Flex className='suggestions' dir='column'>
                    {
                        filteredUsers.map(u => {
                            const inviteSent = invites?.find(inv => inv.to._id === u._id)
                            return (
                                <Flex key={u._id} jc='space-between'>
                                    <div>{u.handle}</div>
                                    {inviteSent ? (
                                        <Flex>
                                            <CheckDouble size='20' />
                                        </Flex>
                                    ) : (
                                        <BlankButton
                                            type='button'
                                            onClick={(e) => handleSubmit(e, u)}
                                        >
                                            invite
                                        </BlankButton>
                                    )}

                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Form>
        </>
    )
}