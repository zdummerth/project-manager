import { useState } from 'react'
import LoginForm from 'components/forms/LoginForm';
import { Magic } from 'magic-sdk'
import { useRouter } from 'next/router'



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
    <>
      <div className="std-div alt-bg w-100 mt-s">
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} loading={loading} />
      </div>
    </>
  )
}

export default Login

