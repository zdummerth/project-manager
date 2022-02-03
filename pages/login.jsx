import { useState } from 'react'
import { useSWRConfig } from 'swr'
import Router from 'next/router'
import LoginForm from 'components/forms/LoginForm';
import { Magic } from 'magic-sdk'


const Login = () => {
  const { mutate } = useSWRConfig()

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

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        const userData = await res.json()
        mutate('/api/user')
        Router.push('/')
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setLoading(false)
      setErrorMsg(error.message)
    }
  }

  return (
    <>
      <div className="std-div alt-bg w-100 mt-s">
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} loading={loading} />
      </div>
    </>
  )
}

export default Login

