import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Trash, Cog } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from 'components/shared/Button'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    position: relative;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.background};
    
    .mgr{
        margin-top: 20px;
        // width: 100%;
        i {
            margin-right: 10px;
        }
    }

    #settings {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    #settings-menu {
        background: ${({ theme }) => theme.colors.altBackground};
        padding: 10px;
        border-radius: 10px;
    }

    #trash {
        color: red;
    }
`

const ProjectCard = ({ project, id, remove }) => {
    const [showSettings, setShowSettings] = useState('')

    return (
        <Container dir='column'>
            <Flex id='settings'>
                {showSettings && (
                    <Flex id='settings-menu'>
                        <BlankButton onClick={remove}>
                            <Flex
                                id='trash'
                                ai='center'
                            >
                                <Trash size='18' />
                                <div>delete project</div>
                            </Flex>

                        </BlankButton>
                    </Flex>
                )}
                <BlankButton id='settings-btn' onClick={() => setShowSettings(!showSettings)}>
                    <Cog size='18' />
                </BlankButton>
            </Flex>

            <Link href={`/projects/${id}`}>
                <a>
                    <div className='name'>{project.title}</div>
                </a>
            </Link>
            <Flex className='mgr' jc='space-between'>
                <i>manager:</i>
                <i>{project.manager.handle}</i>
            </Flex>
        </Container>
    )
}

export default ProjectCard