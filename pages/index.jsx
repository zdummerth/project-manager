import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'
import ProjectList from 'components/projects/ProjectList'

const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ userId }) {

  return (
    <Container dir='column' ai='center'>
      <div className="std-div alt-bg w-100 mtb-s">
        <Flex jc='center' className='bg std-div w-100'>
          <h2>my projects</h2>
        </Flex>
      </div>
      <ProjectList userId={userId} />
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
