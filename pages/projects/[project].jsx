import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { getLoginSession } from 'lib/auth'
import { useProject, useInvites } from 'lib/hooks'
import { findProjectByID } from 'lib/fauna'
import NewTaskForm from 'components/forms/NewTaskForm'
import SendInviteForm from 'components/forms/SendInviteForm'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import TaskList from 'components/tasks/TaskList'

import { UserPlus, X } from '@styled-icons/boxicons-regular'

import Button, { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  margin: 20px;

  #invite-form-container {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.92);
  }

  #inner-form {
    height: 50%;
    width: 80%;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.text};
  }

  #inner-inner {
    width: 100%;
  }

  .task-list {
    margin-top: 40px;
  }

  .new-task-button {
    align-self: start;
  }

`

function ProjectPage({ proj, userId }) {

  const {
    project,
    loading,
    error,
  } = useProject(proj._id)

  const [showForm, setShowForm] = useState('')

  if (error) {
    return (
      <div>Error fetching project</div>
    )
  }

  return (
    <Container dir='column' ai='center'>
      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : (
        <>
          <h1>
            {project.name}
          </h1>
          <Flex>
            <h3 style={{ marginRight: '5px' }}>Manager: </h3>
            <h3>{project.manager.handle}</h3>
          </Flex>
          <BlankButton onClick={() => setShowForm('invite')}>
            <UserPlus size='24' />
          </BlankButton>

          <i style={{ marginRight: '5px' }}>Members: </i>
          {project.members.data.map(m => {
            return (
              <div key={m._id}>{m.handle}</div>
            )
          })}

          {showForm && (
            <Flex id='invite-form-container' ai='center' jc='center'>
              <Flex id='inner-form' dir='column'>
                <BlankButton onClick={() => setShowForm("")}>
                  <X size='24' />
                </BlankButton>
                {showForm === 'invite' ? (
                  <Flex id='inner-inner' dir='column' ai='center' jc='start'>
                    <h4>inivite users to join project</h4>
                    <i>{project.name}</i>
                    <SendInviteForm userId={userId} projectId={proj._id} />
                  </Flex>
                ) : (
                  <Flex id='inner-inner' dir='column' ai='center' jc='start'>
                    <h4>create new task</h4>
                    <i>{project.name}</i>
                    <NewTaskForm userId={userId} projectId={proj._id} status='todo' />
                  </Flex>
                )}


              </Flex>
            </Flex>
          )}
          <BlankButton className='new-task-button' onClick={() => setShowForm('new-task')}>
            create task
          </BlankButton>
          <TaskList className='task-list' userId={userId} projectId={proj._id} />
        </>
      )}
    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  // console.log({ params })

  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    const project = await findProjectByID({
      id: params.project,
      secret: session.accessToken
    })
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
