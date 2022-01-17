import React from 'react'
import Link from "next/link"
import styled from 'styled-components'
import { Home, Pen, CloudLightRain } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { useUser } from 'hooks/useUser'

import { BlankButton } from 'components/shared/Button'
import { breakpoints } from 'styles'

const I = styled.i`

  @media (min-width: ${breakpoints.tablet}) {

  }
`

const Nav = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 5px;
  background: ${({ theme }) => theme.colors.rgradient};
  width: 100%;
`


const Navigation = () => {
  const { user, mutate } = useUser()

  const handleLogout = async () => {
    const loggedOut = await fetch('/api/logout')
    console.log('logged out', loggedOut)
    mutate()
  }

  return (
    <Nav jc='space-around'>
      <Link
        href='/'
        name='Home'
      >
        <a>
          <Home size='22' />
          <I>Home</I>
        </a>
      </Link>
      <Link
        href='/projects'
        name='Projects'
      >
        <a>
          <CloudLightRain size='22' />
          <I>Projects</I>
        </a>
      </Link>
      <Link
        href='/tasks'
        name='Tasks'
      >
        <a>
          <Pen size='22' />
          <I>Tasks</I>
        </a>
      </Link>
      {user && (
        <BlankButton onClick={handleLogout}>Logout</BlankButton>
      )}
    </Nav>
  )
}

export default Navigation
