import React from 'react'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'
import Flex from 'components/shared/Flex'
import { useProjects } from 'lib/hooks'
import SingleFieldForm from 'components/forms/SingleFieldForm'
import { getLoginSession } from 'lib/auth'
import ProjectCard from 'components/projects/ProjectCard'

const Container = styled(Flex)`

`

export default function Home({ userId }) {
  const { projects } = useProjects({ userId })
  const { mutate } = useSWRConfig()
  // console.log('projects: ', projects)

  const handleMutate = () => {
    mutate(['/api/projects', userId], async prev => {
      console.log('old data: ', prev)
      return prev
    }, false)
  }
  return (
    <Container dir='column' ai='center'>
      <h1>Home</h1>
      {/* <SingleFieldForm /> */}
      {projects && projects.map(p => {
        return (
          <ProjectCard project={p.data} id={p._id} key={p._id} />
        )
      })}
      <button onClick={handleMutate}>
        Test Mutate
      </button>
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
