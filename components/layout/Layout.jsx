import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import useAppState from 'hooks/useAppState'
import { getCollectionSlugs } from 'lib/shopify'
import { XCircle } from '@styled-icons/boxicons-regular'
import { CartProvider } from 'context/Store'
import CollectionNavigation from 'components/layout/CollectionNavigation'
import { useRouter } from 'next/router'
import { fontSizes } from 'styles'
import Flex from 'components/shared/Flex'
import Navigation from 'components/layout/Navigation'
import Footer from './Footer'

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
    // align-items: center;
    // justify-content: center;
    width: 100%;
    min-height: calc(100vh - 50px);
    max-width: 1400px;

`

const Layout = ({ children }) => {
  // console.log('', )
  const [collectionlinks, setCollectionlinks] = useState([])
  const { menuOpen } = useAppState()
  const router = useRouter()
  console.log('router', router)



  useEffect(() => {
    const init = async () => {
      const nodes = await getCollectionSlugs()
      const slugs = nodes.map(n => n.node)
      console.log({ slugs })
      setCollectionlinks(slugs)
    }
    init()
  }, [])


  return (
    <>
      <GlobalStyle open={menuOpen} />
      <CartProvider>
        <Container dir='column'>
          <Navigation collections={collectionlinks} />
          {/* {router.pathname.includes('collections') && (
            <CollectionNavigation collections={collectionlinks} />
          )} */}
          <Content>
            {children}
          </Content>
          <Footer />
        </Container>
      </CartProvider>
    </>
  )
}

export default Layout