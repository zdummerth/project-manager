import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import TaskBoard from 'components/tasks/TaskBoard'
import Flex from 'components/shared/Flex'
import { useTasks } from 'lib/hooks'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Trash, BookAdd } from '@styled-icons/boxicons-regular'

import Button, { BlankButton } from 'components/shared/Button'
import { breakpoints } from 'styles'


const Container = styled(Flex)`
  width: 100%;
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

function TaskList({ className, tasks }) {

  return (
    <>
      {/* <BoardsContainer className={className}>
        {['todo', 'doing', 'done'].map(s => {
          return (
            <StyledBoard
              status={s}
              key={s}
              tasks={tasks.filter(t => t.status === s)}
              setExpandedTask={setExpandedTask}
              openForm={() => setShowForm(s)}
              className='alt-bg std-div'
            />
          )
        })}
      </BoardsContainer> */}
    </>
  )
}

export default TaskList
