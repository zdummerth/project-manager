import styled from 'styled-components'
import { XCircle } from '@styled-icons/boxicons-regular'
import { fontSizes } from 'styles'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'
import DonateForm from 'components/forms/donate/form/Controls'
import useAppState from 'hooks/useAppState'




const Container = styled(Flex)`
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
    bottom: ${({ open }) => open ? '0' : '-250px'};
    transition: bottom .5s ease-in-out;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-bottom: none;
`

const Filler = styled.div`
    position: fixed;    
    height: 100vh;
    width: 100%;
    bottom: 48px;
    background: rgba(0,0,0,.95);
    opacity: ${({ open }) => open ? '1' : '0'};
    z-index: ${({ open }) => open ? '0' : '-1'};
    transition: opacity .5s ease-in-out;
`

const Layout = ({ children }) => {
    // console.log('', )

    const {
        donateOpen,
        toggleDonateOpen,
    } = useAppState()


    return (
        <Container dir='column'>
            <Navigation />

            <Content>
                {children}
            </Content>


            <Filler onClick={toggleDonateOpen} open={donateOpen} />
            <StyledDonate open={donateOpen} dir='column' ai='center'>
                <BlankButton onClick={toggleDonateOpen}>
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