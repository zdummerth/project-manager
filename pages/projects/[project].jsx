import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { getLoginSession } from 'lib/auth'
import { useProject, useInvites } from 'lib/hooks'
import { findProjectByID } from 'lib/fauna'
import NewTaskForm from 'components/forms/NewTaskForm'
import SendInviteForm from 'components/forms/SendInviteForm'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import SearchUsers from 'components/SearchUsers'
import Task from 'components/tasks/Task'
import TaskBoard from 'components/tasks/TaskBoard'
import { dimensions, breakpoints } from 'styles'


import { UserPlus, CaretDown, X, ArrowBack } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: calc(100vh - 100px);

  #expanded-task {
    max-width: 450px
  }
`

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow-x: auto;
`

const StyledBoard = styled(TaskBoard)`
  flex: 0 0 auto;
  width: 80vw;
  max-width: 375px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex: 1 1 auto;
    max-width: 500px;
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

  console.log('project page loaded')

  if (project) {
    console.log('project page members', [
      ...project.members.data,
      project.manager
    ])
  }

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
            <Flex className="alt-bg std-div mt-s w-100">
              <form className=''>
                <Flex ai='center' jc='space-between'>
                  <input
                    name='title'
                    id='title'
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
            </Flex>


            <Flex ai='center' className='alt-bg std-div mtb-s w-100'>
              <Flex ai='center' jc='space-between' className='bg std-div w-100'>
                <Flex>
                  <i style={{ marginRight: '5px' }}>manager: </i>
                  <i style={{ marginRight: '25px' }}>{project.manager.handle}</i>
                </Flex>
                <Flex ai='center'>
                  <i style={{ marginRight: '5px' }}>members: </i>

                  <div>
                    {project.members.data.length}
                  </div>
                  <BlankButton onClick={() => setShowMembers(!showMembers)}>
                    <CaretDown size='20' />
                  </BlankButton>
                  {showMembers && (
                    <Flex dir='column' className='bg std-div pop-up'>
                      <BlankButton onClick={() => setShowMembers(!showMembers)}>
                        <X size='20' />
                      </BlankButton>
                      {showMembers === 'invites' ? (
                        <>
                          <p>
                            {`send invites for ${project.title}`}
                          </p>
                          <SendInviteForm
                            userId={userId}
                            projectId={proj._id}
                            isInvite={true}
                            projectMembers={[
                              ...project.members.data,
                              project.manager
                            ]}
                          />
                        </>
                      ) : (
                        <Flex dir='column' ai='center' className='alt-bg std-div w-100 mb-s'>
                          <i style={{ marginBottom: '8px' }}>all members</i>
                          <BlankButton onClick={() => setShowMembers('invites')}>
                            <UserPlus size='24' />
                          </BlankButton>
                          <Flex className="">
                            <div className="alt-div-1 bg m-xxs">
                              <i>@{project.manager.handle}</i>
                            </div>
                            {project.members.data.map(m => {
                              return (
                                <div key={m._id} className="alt-div-1 bg m-xxs">
                                  <i>@{m.handle}</i>
                                </div>
                              )
                            })}
                          </Flex>
                        </Flex>
                      )}


                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>


            {expandedTask ? (
              <Task
                t={project.tasks.data.find(t => t._id === expandedTask)}
                project={project}
                close={() => setExpandedTask('')}
                update={updateTask}
                remove={deleteTask}
                loading={updating.creating}
                userId={userId}
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
                      className='alt-bg std-div'
                    />
                  )
                })}
              </BoardsContainer>
            )}
          </>
        )}
        {showForm && (
          <Flex className="std-div bg pop-up" ai='center'>
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
