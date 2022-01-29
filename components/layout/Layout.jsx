import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.altBackground};
    overflow-y: ${({ open }) => open ? 'hidden' : 'visible'};
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;

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
    min-height: 100vh;
    overflow: hidden;
`

const Content = styled(Flex)`
    flex: 1;
    width: 95%;
    margin-right: auto;
    margin-left: auto;
    // min-height: calc(100vh - 50px);
    max-width: 1400px;

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