import Link from 'next/link'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`

`

const ProjectCard = ({ project, id }) => {
    return (
        <Container>
            <Link href={`/projects/${id}`}>
                <a>
                    <div>{project.name}</div>
                </a>
            </Link>
        </Container>
    )
}

export default ProjectCard