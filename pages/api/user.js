import { getLoginSession } from 'lib/auth'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    // console.log('session', session)
    // After getting the session you may want to fetch for the user instead
    // of sending the session's payload directly, this example doesn't have a DB
    // so it won't matter in this case
    res.status(200).json({
      user: {
        email: session.email,
        faunaId: session.id,
        isAdmin: session.roles.includes('admin')
      } || null
    })
  } catch {
    res.status(400).json({
      error: 'user session not found'
    })
  }
}
