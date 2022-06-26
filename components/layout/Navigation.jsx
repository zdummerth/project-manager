import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Home, User, Message, Store } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { useInvites } from 'lib/hooks'
import { Received } from 'components/invites/InviteList'
import Invite from 'components/invites/Invite'
import { BlankButton } from 'components/shared/Button'

const Nav = styled(Flex)`
  position: relative;

  .invite-container {
    position: absolute;
    top: 120%;
    left: 0;
    width: 100%;
    max-width: 500px;
    z-index: 3;
    box-shadow: 0 0 5px 0px ${({ theme }) => theme.colors.text};

    i {
      margin: 10px 0;
      align-self: center;
    }
  }
`

const InviteBtn = styled(BlankButton)`
  border: ${({ theme, active }) => active ? `1px solid ${theme.colors.brand}` : 'none'};
`

const Navigation = () => {
  const { invites, acceptInvite, updating, deleteInvite } = useInvites()
  const [showInvites, setShowInvites] = useState(false)

  const rInvites = invites ? invites.receivedInvites.data : []
  const sInvites = invites ? invites.sentInvites.data : []

  // console.log('invites', invites)
  return (
    <Nav ai='center' className='bg w-100'>
      <Link href='/' name='Home'>
        <a>
          <Flex className='std-div bg' dir='column' ai='center'>
            <Home size='20' />
          </Flex>
        </a>
      </Link>
      <Link href='/profile' name='profile'>
        <a>
          <Flex className='std-div bg ml-xs' dir='column' ai='center'>
            <User size='20' />
          </Flex>
        </a>
      </Link>
      <Link href='/shopify-admin/dashboard' name='shopify-admin/dashboard'>
        <a>
          <Flex className='std-div bg ml-xs' dir='column' ai='center'>
            <Store size='20' />
          </Flex>
        </a>
      </Link>
      <InviteBtn
        onClick={() => setShowInvites(!showInvites)}
        active={rInvites.length > 0}
      >
        <Flex ai='center' className='std-div bg'>
          <Message size='20' />
        </Flex>
      </InviteBtn>
      {showInvites && (
        <Flex dir='column' ai='stretch' className='invite-container std-div alt-bg'>
          <Flex dir='column' ai='stretch'>
            {rInvites.length === 0 ? <i>you don't have any invites</i>: <i>invites</i>}
            <Received />
          </Flex>
        </Flex>
      )}
    </Nav>
  )
}

export default Navigation
