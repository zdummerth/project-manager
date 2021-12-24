import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { getCollectionSlugs } from 'lib/shopify'
import { XCircle } from '@styled-icons/boxicons-regular'
import { CartProvider } from 'context/Store'
import { fontSizes } from 'styles'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'
import DonateForm from 'components/forms/donate/form/Controls'
import useAppState from 'hooks/useAppState'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }


  a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Cinzel, 'Playfair Display SC', serif;
  }

  main {
    width: 100%;
  }

`


const Container = styled(Flex)`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
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
    const [collectionlinks, setCollectionlinks] = useState([])

    useEffect(() => {
        const init = async () => {
            const nodes = await getCollectionSlugs()
            const slugs = nodes.map(n => n.node)
            console.log({ slugs })
            setCollectionlinks(slugs)
        }
        init()
    }, [])

    const {
        donateOpen,
        toggleDonateOpen,
    } = useAppState()


    return (
        <>
            <GlobalStyle />

            <CartProvider>
                <Container dir='column'>
                    <Navigation collections={collectionlinks} />

                    <Content>
                        {children}
                    </Content>


                    <Filler onClick={toggleDonateOpen} open={donateOpen} />
                    {/* <StyledDonate open={donateOpen} dir='column' ai='center'>
                <BlankButton onClick={toggleDonateOpen}>
                    <XCircle size={fontSizes.icons} />
                </BlankButton>
                <FormContainer open={donateOpen}>
                    <DonateForm />
                </FormContainer>
            </StyledDonate> */}

                </Container>
            </CartProvider>
        </>
    )
}

export default Layout