import React, { useState } from 'react'
// import Link from 'next/link'
import styled from 'styled-components'
import { CheckDouble } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from './shared/Button'

const Container = styled(Flex)`
    width: 100%;
    // height: 100%;

    .suggestions {
        height: 190px;
        overflow: auto;
    }

    .check {
        color: ${({ theme }) => theme.colors.brand};
    }
`

const SearchUsers = ({
    onUserClick,
    isInvite,
    invites = [],
    className,
    users,
    checkedUsers
}) => {

    // console.log('search users', users)

    const [value, setValue] = useState("")

    const filteredUsers = isInvite ? users.filter(u =>
        u.handle.includes(value) && value !== ""
    ) :
        users.filter(u => u.handle.includes(value))

    // const filteredUsers = [...users, ...users]
    return (
        <Container
            dir='column'
            flex='1'
            className={className}
        >
            <input
                name='invites'
                id='invites'
                placeholder='search users'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <p className='mtb-s'>suggestions</p>
            <Flex className='w-100 suggestions std-div bg' dir='column'>
                {filteredUsers.map((u, ind) => {
                    const inviteSent = invites
                        .find(inv => (
                            inv.to._id === u._id
                        ))

                    const checked = checkedUsers.includes(u._id)
                    return (
                        <Flex
                            key={u._id}
                            jc='space-between'
                            className={`
                                    std-div
                                    bg 
                                    w-100
                                    border
                                    ${ind > 0 && 'mt-xs'}
                                `}
                        >
                            <div>@{u.handle}</div>
                            {checked ? (
                                <Flex>
                                    <CheckDouble className='check' size='20' />
                                </Flex>
                            ) : (
                                <BlankButton
                                    type='button'
                                    onClick={() => onUserClick(u._id)}
                                >
                                    {isInvite ? 'invite' : 'assign'}
                                </BlankButton>
                            )}

                        </Flex>
                    )
                })}
            </Flex>
        </Container>
    )
}

export default SearchUsers