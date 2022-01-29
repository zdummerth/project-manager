import React, { useState, useRef } from 'react'
import Flex from 'components/shared/Flex'
import Link from 'next/link'
import styled from 'styled-components'
import { X, ArrowBack, Trash } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'

const StyledTask = styled(Flex)`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.altBackground};

  .fwidth {
    width: 100%;
  }

  .bg {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  .alt-bg {
    background: ${({ theme }) => theme.colors.altBackground};
  }

  #back-button {
    display: flex;
    align-items: center;
  }

  #delete-button {
    display: flex;
    align-items: center;
    color: red;
    margin-top: 30px;
    align-self: end;
  }

  #row1 {
    width: 100%;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid gray;
  }

  #last-row {
    width: 100%;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid gray;
  }

  #title {
    padding: 5px 10px;;
    border-radius: 10px;
    margin-left: 10px;
  }

  .status {
    padding: 5px 10px;;
    // border: 1px solid gray;
    border-radius: 50px;
    margin-left: 10px;
  }
`

const StyledInput = styled.textarea`
  padding: 5px 10px;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  height: 100px;

  border: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.brand};
    outline: none;
  }
`

const ButtonSelect = styled(BlankButton)`
  border: ${({ theme, active }) => active ? `1px solid ${theme.colors.brand}` : `1px solid gray`};
`


const Task = ({
  t,
  close,
  update,
  remove,
  loading
}) => {
  if (!t) return null

  const [title, setTitle] = useState(t.title)
  const [status, setStatus] = useState(false)
  const formRef = useRef()

  const handleDelete = async () => {
    await remove(t._id)
    close()

  }

  const handleUpdate = async (e, data) => {
    e.preventDefault()
    await update(t._id, data)
  }

  const handleStatusUpdate = async (status) => {
    // e.preventDefault()
    if (status === t.status) {
      setStatus(false)
      return
    }
    await update(t._id, { status })
    setStatus(false)
  }

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == true) {
      e.preventDefault();
      if (loading || (title === t.title)) return
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      )
    }
  }


  return (
    <StyledTask
      className='task alt-bg'
      key={t._id}
      // jc='space-between'
      dir='column'
      status={t.status}
    >
      <Flex id='row1' jc='space-between' ai='center'>
        <BlankButton id='back-button' onClick={close}>
          <ArrowBack size='18' />
          <i>boards</i>
        </BlankButton>

      </Flex>
      <form
        className='fwidth'
        ref={formRef}
        onSubmit={e => handleUpdate(e, { title })}
      >
        <Flex dir='column' ai='center' jc='space-between'>
          <StyledInput
            name='task'
            id='task'
            onKeyDown={onEnterPress}
            className='bg'
            placeholder='add task'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Flex style={{ height: '30px', width: '100%' }} ai='center' jc='space-between'>
            {title !== t.title && (
              <>
                <BlankButton>
                  <i>{'save ( shift + enter )'}</i>
                </BlankButton>
                <BlankButton type='button' onClick={() => setTitle(t.title)}>
                  <i>cancel</i>
                </BlankButton>
              </>
            )}
          </Flex>
        </Flex>
      </form>

      <Flex id='last-row' dir='column'>
        <Flex ai='center'>
          <i>{status ? 'set status' : 'status'}:</i>
          {status ? (
            <Flex>
              <ButtonSelect
                className="status bg"
                onClick={() => handleStatusUpdate('todo')}
                active={t.status === 'todo'}
              >
                todo
              </ButtonSelect>
              <ButtonSelect
                className="status bg"
                onClick={() => handleStatusUpdate('doing')}
                active={t.status === 'doing'}
              >
                doing
              </ButtonSelect>
              <ButtonSelect
                className="status bg"
                onClick={() => handleStatusUpdate('done')}
                active={t.status === 'done'}
              >
                done
              </ButtonSelect>
            </Flex>
          ) : (
            <ButtonSelect
              className="status bg"
              onClick={() => setStatus(true)}
            // active
            >
              {t.status}
            </ButtonSelect>
          )}
        </Flex>
        <BlankButton id='delete-button' onClick={handleDelete} disabled={loading}>
          <Trash size='18' />
          <i>delete task</i>
        </BlankButton>
        {loading && <LoadingIndicator />}
      </Flex>
    </StyledTask >
  )
}

export default Task
