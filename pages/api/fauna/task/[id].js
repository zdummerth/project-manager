import { createTask, findTaskByID } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
    console.log('in task function', req.query)
    console.log('method: ', req.method)
    // console.log('body: ', req.body)

    const {
        name,
        assignedTo,
        project
    } = req.body

    const { id } = req.query
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'GET': {
                const faunares = await findTaskByID({
                    id,
                    secret: session.accessToken
                })

                data = faunares.createTask
                break;
            }
            case 'POST': {
                const faunares = await createTask({
                    name,
                    assignedTo: [session.userId],
                    project,
                    secret: session.accessToken,
                })

                data = faunares.createTask
                break;
            }
            case 'PUT': {
                // code block
                break;
            }
            case 'DELETE': {
                // code block
                break;
            }
            default:
            // code block
        }

        // console.log('task response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}