import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'



const Container = styled(Flex)`
    // background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    // color: blue;
`

const Layout = ({ children }) => {
    return (
        <Container>
            <Navigation />
            {children}
        </Container>
    )
}

export default Layout