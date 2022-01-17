import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { getLoginSession } from 'lib/auth'
import { useProject } from 'lib/hooks'
import { findProjectByID } from 'lib/fauna'
import NewTaskForm from 'components/forms/NewTaskForm'
import LoadingIndicator from 'components/shared/LoadingIndicator'


const Container = styled(Flex)`
  width: 100%;
  margin: 20px;

`

const Task = styled(Flex)`
  width: 100%;
  border: 1px solid gray;
  padding: 8px;

  .status {
    background-color: ${({ complete }) => complete ? 'green' : 'red'};
    height: 12px;
    width: 12px;
    margin-bottom: 8px;
  }

  input {
    height: 20px;
    width: 20px;
  }
`

function ProjectPage({ proj }) {
  const { project, loading, error } = useProject(proj._id)
  // console.log('project page', project)
  const [selectedTasks, setSelectedTasks] = useState([])

  const handleChange = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(prev => (
        prev.filter(prevTask => prevTask !== id)
      ))
    } else {
      setSelectedTasks(prev => ([
        ...prev,
        id
      ]))
    }
  }

  if(error) {
    return (
      <div>Error fetching projects</div>
    )
  }
  return (
    <Container dir='column'>
      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : (
        <>
          <div>
            {project.name}
          </div>
          <NewTaskForm projectId={project._id} />
          {project.tasks.data.map(t => {
            console.log({ t })
            return (
              <Task className='task' key={t._id} jc='space-between'>
                <Flex dir='column'>
                  <div className="status"></div>
                  <Flex>{t.name}</Flex>
                  <Flex>{t.name}</Flex>
                  {t.assignedTo.data.map(u => {
                    return (
                      <Flex key={u._id}>
                        <div>{`Assigned To:`}</div>
                        <Flex>{u.handle.substring(0, 4)}</Flex>
                      </Flex>
                    )
                  })}
                </Flex>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(t._id)}
                  onChange={() => handleChange(t._id)}
                />
              </Task>
            )
          })}
        </>
      )}

    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  // console.log({ params })

  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    // console.log('session yyyy', session)

    const project = await findProjectByID({
      id: params.project,
      secret: session.accessToken
    })
    // console.log('project', project)

    return {
      props: {
        userId: session.userId,
        proj: project.findProjectByID
      },
    }
  } catch (e) {
    console.log('project page error', e)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {

      },
    };
  }
}

export default ProjectPage
