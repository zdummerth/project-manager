import { useUser } from 'hooks/useUser'
import Button from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'

const Container = styled(Flex)`
  width: 100%;
  margin: 20px;
`

const TasksIndex = () => {
    const user = useUser()

    return (
        <Container dir='column'>
            <h1>Tasks</h1>
            {user && (
                <>
                    User is logged in
                </>
            )}
        </Container>
    )
}

export default TasksIndex
