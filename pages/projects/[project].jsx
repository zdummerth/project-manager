import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { getLoginSession } from 'lib/auth'
import { useProject, useInvites } from 'lib/hooks'
import { findProjectByID } from 'lib/fauna'
import NewTaskForm from 'components/forms/NewTaskForm'
import SendInviteForm from 'components/forms/SendInviteForm'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import Task from 'components/tasks/Task'
import TaskBoard from 'components/tasks/TaskBoard'
import { dimensions, breakpoints } from 'styles'


import { UserPlus, CaretDown } from '@styled-icons/boxicons-regular'

import Button, { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: calc(100vh - 100px);
  // margin: 20px;
  background: ${({ theme }) => theme.colors.altBackground};
  color: ${({ theme }) => theme.colors.text};


  .new-task-form {
    position: absolute;
    z-index: 1;
    bottom: 0;
    // left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.altBackground};
  }


  .project-details {
    position: relative;
    width: 100%;
    height: 150px;
    padding-left: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.background};
  }

  .users {
    position: relative;
    padding: 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.altBackground};

    #members {
      border-radius: 10px;
      position: absolute;
      top: 100%;
      right: 0;
      height: 300px;
      border: 1px solid ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => theme.colors.background};
    }
  }

  #settings-btn {
    position: absolute;
    bottom: 10px;
    right: 5px;
  }

  #expanded-task {
    max-width: 450px
  }

`

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: calc(100vh - ${dimensions.navHeight} - 160px);
`

const StyledBoard = styled(TaskBoard)`
  // flex: 1 1 auto;
  flex: 0 0 auto;
  border-radius: 10px;
  width: 80vw;
  max-width: 375px;
  margin-right: 10px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex: 1 1 auto;
    max-width: 500px;
  }
`

const StyledInput = styled.input`
  padding: 5px 10px 5px 0;
  border-radius: 10px;
  border: none;
  padding: 10px;
  // margin-left: 10px;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.altBackground};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.brand};
    outline: none;
  }
`

function ProjectPage({ proj, userId }) {

  const {
    project,
    loading,
    error,
    updating,
    createTask,
    updateTask,
    deleteTask,
    updateProjectTitle
  } = useProject(proj._id)

  // console.log('project page', project)

  const [showForm, setShowForm] = useState('')
  const [showMembers, setShowMembers] = useState('')
  const [expandedTask, setExpandedTask] = useState('')
  const [title, setTitle] = useState(project ? project.title : proj.title)

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateProjectTitle(title)
  }


  if (error) {
    return (
      <div>Error fetching project</div>
    )
  }

  return (
    <>
      <Container dir='column'>
        {loading ? (
          <>
            <LoadingIndicator />
          </>
        ) : (
          <>
            <Flex dir='column' jc='space-around' className="project-details">
              <form className='fwidth'>
                <Flex ai='center' jc='space-between'>
                  <StyledInput
                    name='task'
                    id='task'
                    className='bg'
                    placeholder='add task'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {title !== project.title && (
                    <Flex jc='space-between' ai='center'>
                      <BlankButton onClick={handleUpdate}>
                        <i>save</i>
                      </BlankButton>
                      <BlankButton type='button' onClick={() => setTitle(project.title)}>
                        <i>cancel</i>
                      </BlankButton>
                    </Flex>
                  )}
                </Flex>
              </form>
              <Flex ai='center' className='users'>
                <Flex>
                  <i style={{ marginRight: '5px' }}>manager: </i>
                  <i style={{ marginRight: '25px' }}>{project.manager.handle}</i>
                </Flex>
                <Flex ai='center'>
                  <i style={{ marginRight: '5px' }}>members: </i>
                  {project.members.data.map(m => {
                    return (
                      <i key={m._id}>{m.handle}</i>
                    )
                  })}
                  <div>
                    {project.members.data.length}
                  </div>
                  <BlankButton onClick={() => setShowMembers(!showMembers)}>
                    <CaretDown size='20' />
                  </BlankButton>
                  {showMembers && (
                    <Flex dir='column' id='members'>
                      <SendInviteForm />
                    </Flex>
                  )}
                </Flex>
              </Flex>


            </Flex>
            {expandedTask ? (
              <Task
                t={project.tasks.data.find(t => t._id === expandedTask)}
                close={() => setExpandedTask('')}
                update={updateTask}
                remove={deleteTask}
                loading={updating.creating}
                id='expanded-task'
              />
            ) : (
              <BoardsContainer>
                {['todo', 'doing', 'done'].map(s => {
                  return (
                    <StyledBoard
                      status={s}
                      key={s}
                      tasks={project.tasks.data.filter(t => t.status === s)}
                      setExpandedTask={setExpandedTask}
                      openForm={() => setShowForm(s)}
                    />
                  )
                })}
              </BoardsContainer>
            )}
          </>
        )}
        {showForm && (
          <Flex className="new-task-form" ai='center'>
            <NewTaskForm
              userId={userId}
              projectId={proj._id}
              status={showForm}
              close={() => setShowForm('')}
              loading={updating.creating}
              createTask={createTask}
            />
          </Flex>
        )}
      </Container>

    </>
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
