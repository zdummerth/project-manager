import React, { useState } from 'react'
import styled from 'styled-components'
import TaskBoardItem from 'components/tasks/TaskBoardItem'
import Task from 'components/tasks/Task'
import Flex from 'components/shared/Flex'
// import { useTasks, useProjectMutations } from 'lib/hooks'
import NewTaskForm from 'components/forms/NewTaskForm'
import { Plus } from '@styled-icons/boxicons-regular'
import { BlankButton } from 'components/shared/Button'
import { breakpoints } from 'styles'


const Container = styled(Flex)`
  width: 100%;
  flex: 1;
  overflow: hidden;
`

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow-x: auto;
`
const StyledBoard = styled(Flex)`
  flex: 0 0 auto;
  width: 80vw;
  max-width: 375px;
  margin-right: 10px;
  overflow: hidden;


  &:last-child {
    margin-right: 0;
  }

  .task-container {
    flex: 1;
    flex-wrap: nowrap;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex: 1 1 auto;
    max-width: 500px;
  }
`

function TaskList({ className, tasks, updateTask, deleteTask, loading, project, createTask, userId }) {

  const [task, setTask] = useState({
    task: '',
    formOpen: ''
  })
  const close = () => setTask({
    task: '',
    formOpen: ''
  })
  const open = (e) => setTask({
    task: e.currentTarget.id,
    formOpen: ''
  })

  const openForm = (e) => {
    // console.log('target', e.currentTarget.id)
    const id = e.currentTarget.id

    setTask({
      ...task,
      formOpen: id,
    })
  }

  console.log('state ', task)
  return (
    <Container dir='column' className={className}>
      {task.task ? (
        <Task
          t={tasks.find(t => t._id === task.task)}
          project={project}
          close={close}
          update={updateTask}
          remove={deleteTask}
          loading={loading}
          userId={userId}
          id='expanded-task'
        />
      ) : (
        <BoardsContainer>
          {['todo', 'doing', 'done'].map(s => {
            return (
              <StyledBoard dir='column' jc='space-between' key={s} className='std-div alt-bg'>
                <h4 className='mb-s'>{s}</h4>
                <Flex dir='column' className="task-container">
                  {tasks.filter(el => el.status === s).map(t => {
                    return (
                      <TaskBoardItem
                        onClick={open}
                        t={t}
                        key={t._id}
                      />
                    )
                  })}
                </Flex>
                <BlankButton
                  id={s}
                  className='w-100'
                  onClick={openForm}
                >
                  <Flex ai='center'  jc='center' className='alt-div-1 bg w-100 border'>
                  <Plus size={'18'} />
                  <div>
                    new task
                  </div>
                  </Flex>
                </BlankButton>
              </StyledBoard>
            )
          })}
        </BoardsContainer>
      )}
      {task.formOpen && (
        <Flex className="std-div bg pop-up" ai='center'>
          <NewTaskForm
            userId={userId}
            projectId={project._id}
            status={task.formOpen}
            close={close}
            loading={loading}
            createTask={createTask}
          />
        </Flex>
      )}
    </Container>
  )
}

export default TaskList
