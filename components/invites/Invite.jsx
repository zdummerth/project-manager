import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
// import { useTasks } from 'lib/hooks'
// import LoadingIndicator from 'components/shared/LoadingIndicator'
// import { Trash, BookAdd } from '@styled-icons/boxicons-regular'

import Button from 'components/shared/Button'
import { acceptInvites } from 'lib/fauna'


const Container = styled(Flex)`
  width: 100%;
  border: 1px solid gray;
  padding: 8px;

  .buttons {
    width: 100%;
    margin: 10px 0;
  }

`

function Invite({ invite, loading, deleteInvite, acceptInvite, userId }) {
  // const [selectedTasks, setSelectedTasks] = useState([])
  console.log('invite', invite)
  console.log('user id', userId)
  const sentInvite = userId === invite.from._id
  // console.log('project page', project)

  return (
    <Container dir='column' ai='center'>
      {sentInvite ? (
        <Flex>{`You invited @${invite.to.handle} to join ${invite.project.name}`}</Flex>
      ) : (
        <Flex>{`You have been invited to join ${invite.project.name}`}</Flex>
      )}
      <Flex className='buttons' jc='space-between'>
        {!sentInvite ? (
          <>
            <Button
              onClick={acceptInvite}
              disabled={loading}
              outline
            >
              accept
            </Button>
            <Button
              onClick={deleteInvite}
              disabled={loading}
              outline
            >
              decline
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={deleteInvite}
              disabled={loading}
              outline
            >
              revoke
            </Button>
          </>
        )}
      </Flex>
    </Container>
  )
}

export default Invite
