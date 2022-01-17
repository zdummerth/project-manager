import React from 'react'
import { ThemeProvider } from 'styled-components'
import AppStateProvider from 'context/AppStateProvider'
import { theme1 } from 'styles'
import Layout from 'components/layout/Layout'


function MyApp({ Component, pageProps }) {

  return (
    <>
      <AppStateProvider>
        <ThemeProvider theme={theme1}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppStateProvider>
    </>
  )
}

export default MyApp
