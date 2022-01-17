import { createTask } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
  console.log('in create task function', req.body)

  const {
    name,
    assignedTo,
    project
  } = req.body
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')

    const faunares = await createTask({
      name,
      assignedTo: [session.id],
      project,
      secret: session.accessToken,
    })

    console.log('create task fauna resonse', faunares)

    res.status(200).send(faunares.createTask)

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error);
    res.status(400).json({ error })
  }
}