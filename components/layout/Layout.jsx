import React from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
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

  .bg {
    background: ${({ theme }) => theme.colors.background};
  }

  .alt-bg {
    background: ${({ theme }) => theme.colors.altBackground};
  }

  .std-div {
    border-radius: 10px;
    padding: 10px;
  }

  .alt-div-1 {
    border-radius: 30px;
    padding: 10px;
  }

  .w-100 {
    width: 100%;
  }

  .m-xxs {
    margin: 2.5px;
  }

  .mb-s {
    margin-bottom: 10px;
  }

  .mb-xs {
    margin-bottom: 5px;
  }

  .ml-xs {
    margin-left: 5px;
  }

  .mt-xs {
    margin-top: 5px;
  }

  .mt-s {
    margin-top: 10px;
  }

  .mtb-s {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .active {
    border: 1px solid ${({ theme }) => theme.colors.brand};
  }

  .c-brand {
    color ${({ theme }) => theme.colors.brand};
  }

  .border {
    border: 1px solid gray;
  }

  .rotate {
    animation: ${rotate360} 1s linear infinite;
  }

  .pop-up {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    // height: 300px;
    box-shadow: 0 0 5px 2px ${({ theme }) => theme.colors.text};
  }

  input, textarea {
    border-radius: 10px;
    border: none;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.brand};
      outline: none;
    }
  }
`

const Container = styled(Flex)`
    min-height: 100vh;
    overflow: hidden;
    max-width: 1400px;
`

const Content = styled(Flex)`
    flex: 1;
    width: 100%;
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Container className='std-div' dir='column'>
        <Navigation />
        <Content>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout