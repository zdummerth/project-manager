import React, { useState } from 'react'
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { ThemeProvider } from 'styled-components'
import AppStateProvider from 'context/AppStateProvider'
import { UserContext } from 'context/UserContext'
import { theme1 } from 'styles'
import Layout from 'components/layout/Layout'

// const key = process.env.NODE_ENV === 'production' ? (
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
// ) : (
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
// )
// const stripePromise = loadStripe(key);

function MyApp({ Component, pageProps }) {
  // console.log('page props', pageProps)
  const [user, setUser] = useState()
  const [isNavOpen, setIsNavOpen] = useState()

  return (
    <>
      <AppStateProvider>
        <UserContext.Provider value={[user, setUser]}>
          {/* <Elements stripe={stripePromise}> */}
          <ThemeProvider theme={theme1}>
            <Layout isNavOpen={isNavOpen}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
          {/* </Elements> */}
        </UserContext.Provider>
      </AppStateProvider>
    </>
  )
}

export default MyApp
