import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'
import TaskList from 'components/tasks/TaskList'
import ProjectList from 'components/projects/ProjectList'
import { BlankButton } from 'components/shared/Button'

const Container = styled(Flex)`
  width: 100%;
`

const StyledFilterButton = styled(BlankButton)`
  color: ${({ active, theme }) => active ? theme.colors.text : 'gray'};
  text-decoration: ${({ active }) => active ? 'underline' : 'none'};
`

export default function Home({ userId }) {
  const [showList, setShowList] = useState('projects')

  return (
    <Container dir='column' ai='center'>
      <Flex className=''>
        {['projects', 'tasks'].map(el => (
          <StyledFilterButton
            key={el}
            onClick={() => setShowList(el)}
            active={showList === el}
          >
            <h2>{el}</h2>
          </StyledFilterButton>
        ))}
      </Flex>
      {showList === 'tasks' ? (
        <TaskList userId={userId} />
      ) : (
        <ProjectList userId={userId} />
      )}

    </Container>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    return {
      props: {
        userId: session.userId
      },
    }
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
