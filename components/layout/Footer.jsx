import styled from 'styled-components'
import Flex from 'components/shared/Flex'


const Container = styled(Flex)`

`

const Footer = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Footer