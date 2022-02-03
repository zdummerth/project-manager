import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { Expand } from '@styled-icons/boxicons-regular'
import { BlankButton } from 'components/shared/Button'

const StyledTask = styled(Flex)`
  #title {
    font-size: 14px;
    flex: 1;
  }
`

const TaskBoardItem = ({ t, onClick }) => {
  return (
    <StyledTask
      className='bg std-div w-100 mb-xs'
      jc='space-between'
    >
      <div id='title'>{t.title}</div>
      <BlankButton id={t._id} onClick={onClick}>
        <Expand size='18' />
      </BlankButton>
    </StyledTask>
  )
}

export default TaskBoardItem
