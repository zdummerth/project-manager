import React, { useState, useRef } from 'react'
import Flex from 'components/shared/Flex'
import Link from 'next/link'
import styled from 'styled-components'
import { X, ArrowBack, Trash, UserPlus, Album } from '@styled-icons/boxicons-regular'

import { BlankButton } from 'components/shared/Button'
import SendInviteForm from 'components/forms/SendInviteForm'

const StyledTask = styled(Flex)`
  textarea {
    height: 100px;
  }

  #delete-button {
    color: red;
    margin-top: 30px;
    align-self: end;
  }
`

const ButtonSelect = styled(BlankButton)`
  border: ${({ theme, active }) => active ? `1px solid ${theme.colors.brand}` : `none`};
`

const Task = ({
  t,
  close,
  update,
  remove,
  loading,
  userId,
  project,
}) => {
  if (!t) return null

  const [title, setTitle] = useState(t.title)
  const [status, setStatus] = useState(false)
  const [showMembers, setShowMembers] = useState('')
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
    <StyledTask className='std-div alt-bg w-100' dir='column'>

      <Flex className='mb-s w-100' jc='space-between' ai='center'>
        <BlankButton onClick={close}>
          <Flex ai='center'>
            <ArrowBack size='18' />
            <i>all tasks</i>
          </Flex>
        </BlankButton>
        {loading && <Album size='20' className='rotate c-brand' />}
      </Flex>

      <form
        className='w-100'
        ref={formRef}
        onSubmit={e => handleUpdate(e, { title })}
      >
        <Flex dir='column' ai='center' jc='space-between'>
          <textarea
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

      <Flex className='w-100' dir='column' ai='center'>

        <Flex dir='column' ai='center' className='mb-s w-100'>
          <Flex ai='center'>
            <i >assigned to</i>
            <BlankButton className='ml-xs' onClick={() => setShowMembers(!showMembers)}>
              <UserPlus size='24' />
            </BlankButton>
          </Flex>
          <Flex jc='center' className='std-div alt-bg w-100 mt-s'>
            {t.assignedTo.data.map((m, ind) => {
              return (
                <Flex
                  key={m._id}
                  ai='center'
                  className={`alt-div-1 bg m-xxs`}
                >
                  <div>
                    @{m.handle}
                  </div>
                  <BlankButton onClick={() => update(t._id, {
                    assignedTo: {
                      disconnect: [m._id]
                    }
                  })}>
                    <X size='20' />
                  </BlankButton>
                </Flex>
              )
            })}
          </Flex>

          {showMembers && (
            <Flex dir='column' className='std-div pop-up bg'>

              <BlankButton onClick={() => setShowMembers(!showMembers)}>
                <X size='20' />
              </BlankButton>
              <p>assign members to task</p>
              <SendInviteForm
                userId={userId}
                updateTask={update}
                taskId={t._id}
                task={t}
                projectId={project._id}
                isInvite={false}
                projectMembers={[
                  ...project.members.data,
                  project.manager
                ]}
              />

            </Flex>
          )}
        </Flex>

        <i>{status ? 'set status' : 'status'}</i>
        <Flex dir='column' ai='center' className='w-100 alt-bg std-div mt-s'>
          {status ? (
            <Flex>
              {['todo', 'doing', 'done'].map((s, ind) => (
                <ButtonSelect
                  key={s}
                  className={`alt-div-1 bg ${ind > 0 && 'ml-xs'}`}
                  onClick={() => handleStatusUpdate(s)}
                  active={t.status === s}
                >
                  {s}
                </ButtonSelect>
              ))}
            </Flex>
          ) : (
            <ButtonSelect
              className="alt-div-1 bg"
              onClick={() => setStatus(true)}
            >
              {t.status}
            </ButtonSelect>
          )}
        </Flex>
        <BlankButton id='delete-button' onClick={handleDelete} disabled={loading}>
          <Flex ai='center'>
            <Trash size='18' />
            <i>delete task</i>
          </Flex>
        </BlankButton>
      </Flex>
    </StyledTask >
  )
}

export default Task
