import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useProject } from 'lib/hooks'
import Flex from 'components/shared/Flex'

import Input from 'components/shared/Inputs'
import { BlankButton } from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { Plus, X, Album } from '@styled-icons/boxicons-regular'



const Form = styled.form`
    width: 100%;
    // border: 1px solid ${({ theme }) => theme.colors.brand};
    // box-shadow: 0 0 5px 5px ${({ theme }) => theme.colors.brand};

    i {
        color: #606060;
        margin-right: 8px;
    }
`



export default function NewTaskForm({
    status,
    close,
    loading,
    createTask
}) {
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus();
    })

    const [text, setText] = useState('')
    const [statusState, setStatusState] = useState(status)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === "") return
        await createTask(text, statusState)
        setText("")
    }

    console.log('status state ', statusState)

    return (
        <Form onSubmit={handleSubmit}>
            <Flex dir='column'>
                <BlankButton type='button' onClick={close}>
                    <Flex>
                        <X size='22' />
                    </Flex>
                </BlankButton>
                <Flex ai='center' jc='center' className='std-div alt-bg mb-s w-100'>
                    {['todo', 'doing', 'done'].map((s, ind) => {
                        return (
                            <BlankButton type='button' onClick={() => setStatusState(s)} key={s}>
                                <div className={`alt-div-1 bg ${s === statusState && 'active'}`}>{s}</div>
                            </BlankButton>
                        )
                    })}
                </Flex>
                <Flex ai='center' className='std-div alt-bg w-100'>
                    <input
                        name='task'
                        id='task'
                        placeholder='add task'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        ref={inputRef}
                    />
                    <BlankButton>
                        <Flex>
                            {loading ? (
                                <Album size='22' className='c-brand rotate' />
                            ) : (
                                <Plus size='22' />
                            )}
                        </Flex>
                    </BlankButton>
                </Flex>
            </Flex>
        </Form>
    )
}