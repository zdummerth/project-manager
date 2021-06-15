import React, { useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme1 } from 'styles'
import Layout from 'components/layout/Layout'

const GlobalStyle = createGlobalStyle`
    body {
        box-sizing: border-box;
        margin: 0;
        background: ${theme1.colors.background};
        color: ${theme1.colors.text};
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
`


function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   fetch('/api/createSiteView')
  // }, [])

  return (
    <>
    <GlobalStyle />
      <ThemeProvider theme={theme1}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
