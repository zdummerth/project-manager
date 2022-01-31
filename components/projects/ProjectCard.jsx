import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Trash, Cog } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from 'components/shared/Button'

const Container = styled(Flex)`
    position: relative;

    #settings {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    #trash {
        color: red;
        border: 1px solid red;
    }
`

const ProjectCard = ({ project, id, remove, className, loading }) => {
    const [showSettings, setShowSettings] = useState('')

    return (
        <Container dir='column' className={`std-div bg w-100 ${className}`}>
            <Flex id='settings'>
                {showSettings && (
                    <Flex id='trash' className='std-div alt-bg'>
                        <BlankButton onClick={remove}>
                            <Flex ai='center'>
                                <Trash size='18' />
                                <div>delete project</div>
                            </Flex>

                        </BlankButton>
                    </Flex>
                )}
                <BlankButton
                    id='settings-btn'
                    onClick={() => setShowSettings(!showSettings)}
                    disabled={loading}
                    className={`${loading && 'rotate'}`}
                >
                    <Cog size='18' />
                </BlankButton>
            </Flex>

            <Link href={`/projects/${id}`}>
                <a>
                    <div className='name'>{project.title}</div>
                </a>
            </Link>
            <Flex className='mt-s'>
                <i>manager:</i>
                <i className='ml-xs'>@{project.manager.handle}</i>
            </Flex>
        </Container>
    )
}

export default ProjectCard