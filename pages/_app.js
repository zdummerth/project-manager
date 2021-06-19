import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
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
const key = process.env.NODE_ENV === 'production' ? (
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
) : (
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
)
const stripePromise = loadStripe(key);

function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   fetch('/api/createSiteView')
  // }, [])

  const [appState, setAppState] = useState({
    donateOpen: false
  })


  return (
    <>
      <GlobalStyle />
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme1}>
          <Layout donateOpen={appState.donateOpen} setAppState={setAppState}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Elements>
    </>
  )
}

export default MyApp
