import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
// import { useTasks } from 'lib/hooks'
// import LoadingIndicator from 'components/shared/LoadingIndicator'
// import { Trash, BookAdd } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  width: 100%;
  // margin: 10px auto;
  background: ${({ theme }) => theme.colors.altBackground};
  border-radius: 10px;
  // border: 1px solid gray;
  padding: 10px;

  .buttons {
    width: 100%;
    margin: 10px 0;
  }
`

const Button = styled(BlankButton)`
  margin: 5px;
  color: ${({ theme, remove }) => remove ?  'red' : theme.colors.text};
`

function Invite({ invite, loading, deleteInvite, acceptInvite, sent }) {
  // const [selectedTasks, setSelectedTasks] = useState([])
  // console.log('invite', invite)
  // console.log('user id', userId)
  // console.log('project page', project)

  return (
    <Container dir='column' ai='center'>
      {sent ? (
        <Flex>{`You invited @${invite.to.handle} to join ${invite.project.title}`}</Flex>
      ) : (
        <Flex>{`You have been invited to join ${invite.project.title}`}</Flex>
      )}
      <Flex className='buttons' jc='flex-end'>
        {!sent ? (
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
              remove
            >
              decline
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={deleteInvite}
              disabled={loading}
              remove
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
