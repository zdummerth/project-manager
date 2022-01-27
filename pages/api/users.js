import { getLoginSession } from 'lib/auth'
import { getAllUsers } from 'lib/fauna'

export default async function user(req, res) {
  try {
    console.log('in all users function')
    const session = await getLoginSession(req, 'auth_cookie_name')
    // console.log('session', session)

    const fRes = await getAllUsers(session.accessToken)

    console.log('all user res', fRes)

    res.status(200).json(fRes.allUsers)
  } catch (e) {
    console.log('user function err', e)
    res.status(400).send()
  }
}
