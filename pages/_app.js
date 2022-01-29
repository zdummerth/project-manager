import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import AppStateProvider from 'context/AppStateProvider'
import { theme1, theme2, theme3 } from 'styles'
import Layout from 'components/layout/Layout'


function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark-shade')
  let currentTheme = {}
  switch (theme) {
    case 'dark': {
      currentTheme = theme1
      break
    }
    case 'dark-shade': {
      currentTheme = theme3
      break
    }
    case 'light': {
      currentTheme = theme2
      break
    }
  }
  return (
    <>
      <AppStateProvider>
        <ThemeProvider theme={currentTheme}>
          <Layout>
            <Component setTheme={setTheme} {...pageProps } />
          </Layout>
        </ThemeProvider>
      </AppStateProvider>
    </>
  )
}

export default MyApp
