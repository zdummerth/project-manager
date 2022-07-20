import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'
import { GlobalStyle } from 'styles'

const Container = styled(Flex)`
    min-height: 100vh;
    overflow: hidden;
    max-width: 1400px;
    margin: 0 auto;
`

const Content = styled(Flex)`
    flex: 1;
    width: 100%;
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Container className='std-div' dir='column' ai='center'>
        <Navigation />
        <Content dir='column' ai='center'>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout
