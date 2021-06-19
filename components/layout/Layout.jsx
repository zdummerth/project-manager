import styled from 'styled-components'
import { DollarCircle, XCircle } from '@styled-icons/boxicons-regular'
import { fontSizes } from 'styles'

import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'
import DonateForm from 'components/forms/donate/form'




const Container = styled(Flex)`
    // background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    max-width: 700px;
    margin: 0 auto;
`

const FormContainer = styled.div`
    height: 200px;
    width: 100%;
`

const Content = styled(Flex)`
    flex: 1;
    width: 100%;
`

const BlankButton = styled.button`
    align-self: flex-end;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    height: 48px;
`

const StyledDonate = styled(Flex)`
    position: fixed;
    width: 100%;
    max-width: 700px;
    bottom: ${({ open }) => open ? '0' : '-248px'};
    transition: bottom .5s ease-in-out;
    background: ${({ theme }) => theme.colors.background};
    // height: 100vh;
`

const Filler = styled.div`
    position: fixed;    
    height: 100vh;
    width: 100%;
    // bottom: 248px;
    bottom: 48px;
    background: rgba(0,0,0,.9);
    opacity: ${({ open }) => open ? '1' : '0'};
    z-index: ${({ open }) => open ? '0' : '-1'};
    transition: opacity .5s ease-in-out;
`

const Layout = ({ children, setAppState, donateOpen }) => {

    console.log('process', process.env.NODE_ENV)

    const handleClick = () => {
        setAppState(prev => ({
            ...prev,
            donateOpen: !donateOpen
        }))
    }
    return (
        <Container dir='column'>
            <Content>
                {children}
            </Content>
            {/* <BlankButton onClick={handleClick}>
                <DollarCircle size={fontSizes.icons} />
            </BlankButton> */}
            <Navigation setAppState={setAppState} donateOpen={donateOpen} />

            <Filler onClick={handleClick} open={donateOpen} />

            <StyledDonate open={donateOpen} dir='column' ai='center'>
                <BlankButton onClick={handleClick}>
                    <XCircle size={fontSizes.icons} />
                </BlankButton>
                <FormContainer open={donateOpen}>
                    <DonateForm />
                </FormContainer>
            </StyledDonate>
        </Container>
    )
}

export default Layout