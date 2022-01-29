import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { Expand } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'

const StyledTask = styled(Flex)`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.altBackground};

  #title {
    font-size: 14px;
    flex: 1;
  }
`

const TaskBoardItem = ({ t, expand }) => {
  return (
    <StyledTask
      className='task'
      key={t._id}
      jc='space-between'
      status={t.status}
    >

      <div id='title'>{t.title}</div>
      <BlankButton onClick={expand}>
        <Expand size='18' />
      </BlankButton>
    </StyledTask>
  )
}

export default TaskBoardItem
