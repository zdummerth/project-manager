import Link from 'next/link'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    width: 100%;
    border: 1px solid gray;
    padding: 8px;
    margin-top: 5px;
    
    .mgr {
        margin-top: 20px;
        width: 100%;
    }
`

const ProjectCard = ({ project, id }) => {
    return (
        <Container dir='column'>
            <Link href={`/projects/${id}`}>
                <a>
                    <div className='name'>{project.title}</div>
                </a>
            </Link>
            <Flex className='mgr' jc='space-between'>
                <i>Manager:</i>
                <i>{project.manager.handle}</i>
            </Flex>
        </Container>
    )
}

export default ProjectCard