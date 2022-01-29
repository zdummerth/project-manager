import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import Link from 'next/link'
import styled from 'styled-components'
import { useTasks } from 'lib/hooks'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Plus } from '@styled-icons/boxicons-regular'
import TaskBoardItem from 'components/tasks/TaskBoardItem'

import Button, { BlankButton } from 'components/shared/Button'


const Container = styled(Flex)`
  width: 100%;

  .task-container {
    flex: 1;
    flex-wrap: nowrap;
    overflow-y: auto;
    width: 100%;
  }
`

const StyledButton = styled(BlankButton)`
  // background: green;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  border: 1px solid gray;
`




function TaskBoard({
  className,
  loading,
  tasks = [],
  status,
  openForm,
  setExpandedTask
}) {

  // console.log('task list project id', projectId)

  return (
    <Container
      dir='column'
      jc='space-between'
      className={className}
    >
      <h4>{status}</h4>

      <Flex
        dir='column'
        className="task-container"
      >
        {loading ? (
          <>
            <LoadingIndicator />
          </>
        ) : (
          <>
            {tasks.map(t => {
              // console.log({ t })
              return (
                <TaskBoardItem
                  t={t}
                  key={t._id}
                  expand={() => setExpandedTask(t._id)}
                  close={() => setExpandedTask('')}
                />

              )
            })}
          </>
        )}
      </Flex>

      <StyledButton id='new-task-button' onClick={openForm}>
        <Plus size={'18'} />
        new task
      </StyledButton>
    </Container>
  )
}

export default TaskBoard
