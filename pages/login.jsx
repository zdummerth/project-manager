import { useState } from 'react'
import LoginForm from 'components/forms/LoginForm';
import { Magic } from 'magic-sdk'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 500px;
`



const Login = () => {
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      setLoading(true)
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      })

      const userData = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      console.log('user logged in on client', userData)
      router.push('/')

    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setLoading(false)
      setErrorMsg(error.message)
    }
  }

  return (
    <Wrapper className='w-100 flex fjs-c'>
      <div className="std-div alt-bg w-100 mt-s">
      <p>Enter an email address to create an account. This site utilizes email links for authentication with Magic Links.</p>
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} loading={loading} />
      </div>
    </Wrapper>
  )
}

export default Login
