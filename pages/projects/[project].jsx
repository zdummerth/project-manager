import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { getLoginSession } from 'lib/auth'
import { useProject } from 'lib/hooks'
import { findProjectByID } from 'lib/fauna'
import SendInviteForm from 'components/forms/SendInviteForm'
import { Sent } from 'components/invites/InviteList'
import TaskList from 'components/tasks/TaskList'
import { Album } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);

  #expanded-task {
    max-width: 450px
  }
`



const StyledFilterButton = styled(BlankButton)`
  color: ${({ active, theme }) => active ? theme.colors.text : 'gray'};
  text-decoration: ${({ active }) => active ? 'underline' : 'none'};
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


  const [showList, setShowList] = useState({
    name: 'tasks',
    id: '',
    showForm: false
  })

  const [title, setTitle] = useState(project ? project.title : proj.title)

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateProjectTitle(title)
  }

  const handleAllTasks = () => {
    setShowList(p => ({
      ...p,
      name: 'tasks',
      id: '',
    }))
  }

  const handleListChange = (e) => {
    const name = e.currentTarget.id
    setShowList(p => ({
      ...p,
      name,
      id: '',
    }))
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
          <Flex
            ai='center'
            jc='center'
            flex='1'
            className='w-100'
          >
            <Album size='40' className='c-brand rotate' />
          </Flex>
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
                <Flex ai='center' jc='space-between' className='w-100'>
                  {['tasks', 'members', 'invites'].map(el => (
                    <StyledFilterButton
                      key={el}
                      id={el}
                      onClick={handleListChange}
                      active={showList.name === el}
                    >
                      <div>{el}</div>
                    </StyledFilterButton>
                  ))}

                </Flex>
              </Flex>
            </Flex>

            {showList.name === 'tasks' && (
              <TaskList
                tasks={project.tasks.data}
                project={project}
                close={handleAllTasks}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                loading={updating.creating}
                userId={userId}
                id='expanded-task'
              />
            )}

            {showList.name === 'members' && (
              <Flex dir='column' ai='center' className='alt-bg std-div w-100 mb-s'>
                <i style={{ marginBottom: '8px' }}>all members</i>
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

            {showList.name === 'invites' && (
              <>
                <Flex dir='column' className='alt-bg std-div w-100'>
                  <p className='mb-s'>
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
                </Flex>
                <Flex dir='column' className='alt-bg std-div w-100 mt-s'>
                  <p className=''>pending invites</p>
                  <Sent projectId={proj._id} />
                </Flex>
              </>
            )}
          </>
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
