import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import Link from 'next/link'
import styled from 'styled-components'
import { useTasks } from 'lib/hooks'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Trash, BookAdd } from '@styled-icons/boxicons-regular'

import Button, { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  width: 100%;

  .buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    // margin-bottom: 10px;
    border-top: 1px solid gray;
    padding: 15px;
    background: ${({ theme }) => theme.colors.background};

    button {
      margin: 5px;
    }
  }

  .filters {
    // width: 100%;
    margin-bottom: 10px;
  }

`

const StyledFilterButton = styled(BlankButton)`
  color: ${({ active, theme }) => active ? theme.colors.text : 'gray'};
  text-decoration: ${({ active }) => active ? 'underline' : 'none'};
`

const StyledTask = styled(Flex)`
  width: 100%;
  border: 1px solid gray;
  margin-bottom: 20px;
  box-shadow: 0 0 3px ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  // padding: 8px;

  .status {
    background-color: ${({ status }) => {
    if (status === 'done') return 'green'
    if (status === 'doing') return 'yellow'
    if (status === 'todo') return 'red'
  }};
    height: 12px;
    width: 12px;
    margin-right: 8px;
  }

  input {
    height: 20px;
    width: 20px;
  }

  #name {
    width: 100%;
    height: 100%;
    padding: 8px;
    // background: ${({ theme }) => theme.colors.altBackground};
    font-weight: bold;
  }

  #status-bar {
    width: 100%;
    border-bottom: 1px solid gray;
    // margin-bottom: 8px;
    padding: 5px;
    background: ${({ theme }) => theme.colors.altBackground};
  }

  #assignments {
    width: 100%;
    border-top: 1px solid gray;
    // margin-top: 8px;
    padding: 5px;
    background: ${({ theme }) => theme.colors.altBackground};
    
  }
`

const Task = ({ t, handleChange, updating, checked }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <StyledTask
      className='task'
      key={t._id}
      jc='space-between'
      status={t.status}
      dir='column'
    >
      <Flex id='status-bar' ai='center' jc='space-between'>
        <Flex ai='center'>
          <div className="status" />
          <i>{t.status}</i>
        </Flex>
        <Link href={`/projects/${t.project._id}`}>
          <a>
            {t.project.name}
          </a>
        </Link>

        <div>
          {updating ? (
            <LoadingIndicator />
          ) : (
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(t._id)}
            />
          )}
        </div>
      </Flex>

      <Flex id='name'>{t.name}</Flex>

      <Flex id='assignments' dir='column' ai='center'>
        <BlankButton onClick={() => setShowMore(!showMore)}>
          {showMore ? 'less' : 'more'}
        </BlankButton>
        <Flex>
          {showMore && (
            <>
              <div>{`assigned to:`}</div>
              {t.assignedTo.data.map(u => {
                return (
                  <Flex style={{ marginLeft: '8px' }} key={u._id}>
                    <Flex>{u.handle}</Flex>
                  </Flex>
                )
              })}
            </>
          )}
        </Flex>
      </Flex>
    </StyledTask>
  )
}



function TaskList({ projectId, userId, className }) {
  const [taskStatus, setTaskStatus] = useState('todo')
  const [selectedTasks, setSelectedTasks] = useState([])

  // console.log('task list project id', projectId)
  const {
    tasks,
    loading,
    error,
    updateStatusBulk,
    deleteTaskBulk,
    updating
  } = useTasks({
    projectId,
    userId,
    status: taskStatus,
    setSelectedTasks
  })
  // console.log('project page', project)

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

  if (error) {
    return (
      <div>Error fetching tasks</div>
    )
  }

  return (
    <Container dir='column' className={className}>
      {selectedTasks.length > 0 && (
        <Flex className='buttons' jc='space-between'>
          <Button
            onClick={() => updateStatusBulk('doing', selectedTasks)}
            disabled={selectedTasks.length === 0}
            outline
          >
            mark as doing
          </Button>
          <Button
            onClick={() => updateStatusBulk('todo', selectedTasks)}
            disabled={selectedTasks.length === 0}
            outline
          >
            mark as todo
          </Button>
          <Button
            onClick={() => updateStatusBulk('done', selectedTasks)}
            disabled={selectedTasks.length === 0}
            outline
          >
            mark as done
          </Button>
          <Button
            onClick={() => deleteTaskBulk(selectedTasks)}
            disabled={selectedTasks.length === 0}
            outline
          >
            delete
          </Button>
        </Flex>
      )}

      <Flex className='filters' jc='space-between'>
        <StyledFilterButton
          onClick={() => setTaskStatus('todo')}
          active={taskStatus === 'todo'}
        >
          todo
        </StyledFilterButton>
        <StyledFilterButton
          onClick={() => setTaskStatus('doing')}
          active={taskStatus === 'doing'}
        >
          doing
        </StyledFilterButton>
        <StyledFilterButton
          onClick={() => setTaskStatus('done')}
          active={taskStatus === 'done'}
        >
          done
        </StyledFilterButton>
      </Flex>
      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : (
        <>
          {tasks.filter(t => t.status === taskStatus).map(t => {
            // console.log({ t })
            return (
              <Task
                t={t}
                key={t._id}
                handleChange={handleChange}
                checked={selectedTasks.includes(t._id)}
                updating={updating.ids.includes(t._id)}
              />

            )
          })}
        </>
      )}

    </Container>
  )
}

export default TaskList
