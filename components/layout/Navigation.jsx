import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Home, User, Message } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { useUser, useInvites } from 'lib/hooks'
import Invite from 'components/invites/Invite'
import { BlankButton } from 'components/shared/Button'
import { breakpoints } from 'styles'

const I = styled.i`
  font-size: 12px;
  @media (min-width: ${breakpoints.tablet}) {

  }
`

const Nav = styled(Flex)`
  position: relative;

  padding: 5px;
  background: ${({ theme }) => theme.colors.rgradient};
  width: 100%;

  .invite-button {
    // position: relative;
  }

  .invite-count {
    background: ${({ theme }) => theme.colors.background};
    // padding: 3px;
    font-weight: bold;
    margin-left: 5px;
  }

  .invite-container {
    position: absolute;
    // left: 50%;
    // right: 50%;
    // right: 0;
    top: 100%;
    z-index: 3;
    background: ${({ theme }) => theme.colors.background};
    width: 100%;
  }
`


const Navigation = () => {
  const { user, mutate } = useUser()
  const { invites, acceptInvites, updating, deleteInvite } = useInvites()
  const [showInvites, setShowInvites] = useState(false)
  const router = useRouter()

  // console.log('invites', invites)


  const handleLogout = async () => {
    const loggedOut = await fetch('/api/logout')
    mutate(null)
    console.log('logged out', loggedOut)
    router.push('/login')
  }

  return (
    <Nav jc='space-around' ai='center'>
      <Link
        href='/'
        name='Home'
      >
        <a>
          <Flex dir='column' ai='center'>
            <Home size='22' />
            <I>Home</I>
          </Flex>
        </a>
      </Link>
      {/* <Link
        href='/projects'
        name='Projects'
      >
        <a>
          <CloudLightRain size='22' />
          <I>Projects</I>
        </a>
      </Link> */}
      <Link
        href='/profile'
        name='profile'
      >
        <a>
          <Flex dir='column' ai='center'>
            <User size='22' />
            <I>Profile</I>
          </Flex>
        </a>
      </Link>
      <BlankButton className='invite-button' onClick={() => setShowInvites(!showInvites)}>
        <Flex dir='column' ai='center'>
          <Message size='22' />
          <Flex ai='center'>
            <I>Invites</I>
            <I className='invite-count'>{invites.length}</I>
          </Flex>
        </Flex>
      </BlankButton>
      {user && (
        <BlankButton onClick={handleLogout}>Logout</BlankButton>
      )}
      <Flex className='invite-container'>
        {showInvites && (
          <>
            {invites.map(inv => {
              return (
                <Invite
                  invite={inv}
                  userId={user?._id}
                  key={inv._id}
                  acceptInvite={() => acceptInvites([inv._id])}
                  loading={updating}
                  deleteInvite={() => deleteInvite(inv._id)}
                />
              )
            })}
          </>
        )}
      </Flex>
    </Nav>
  )
}

export default Navigation
