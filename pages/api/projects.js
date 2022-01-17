import { getLoginSession } from 'lib/auth'
import { createProject, getProjectsByAccount } from 'lib/fauna'

export default async function user(req, res) {
  console.log('in projects endpoint')
  // console.log(req.body)
  // console.log(req.method)
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    // console.log('session', session)
    // After getting the session you may want to fetch for the user instead
    // of sending the session's payload directly, this example doesn't have a DB
    // so it won't matter in this case
    const projects = await getProjectsByAccount(session.accessToken)
    // console.log('projects', projects.data)
    res.status(200).json(projects.data)
  } catch (e){
    console.log('error in projects endpoint', e)

    res.status(400).json({
      error: 'user session not found'
    })
  }
}
