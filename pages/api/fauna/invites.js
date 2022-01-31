import { getLoginSession } from 'lib/auth'
import { getInvites } from 'lib/fauna'

export default async function user(req, res) {
  console.log('in invites endpoint')
  // console.log(req.body)
  // console.log(req.method)
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    // console.log(session)

    const invites = await getInvites({
      id: session.userId,
      secret: session.accessToken
    })
    // console.log('projects', projects.data)
    res.status(200).json(invites.getInvites)
  } catch (e) {
    console.log('error in invites endpoint', e)

    res.status(400).send()
  }
}
