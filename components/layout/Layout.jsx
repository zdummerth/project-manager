import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    overflow-y: ${({ open }) => open ? 'hidden' : 'visible'};
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    box-sizing: border-box;
    margin: 0;

  }

  *, *:before, *:after {
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

const Content = styled(Flex)`
    flex: 1;
    width: 100%;
    min-height: calc(100vh - 50px);
    max-width: 1400px;
    padding: 5px;

`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Container dir='column'>
        <Navigation />
        <Content>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout