import { createTask, findTaskByID, deleteTask, updateTask, deleteTaskCascade } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
    console.log('in task function', req.query)
    console.log('method: ', req.method)
    console.log('body: ', req.body)

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
                const {
                    title,
                    project,
                    status
                } = req.body

                const faunares = await createTask({
                    title,
                    project,
                    status,
                    secret: session.accessToken,
                })

                data = faunares.createTask
                break;
            }
            case 'PUT': {
                const putdata = req.body
                const { id } = req.query
                const faunares = await updateTask({
                    id,
                    data: putdata,
                    secret: session.accessToken,
                })

                data = faunares.updateTask
                break;
            }
            case 'DELETE': {
                const { id } = req.query
                const faunares = await deleteTaskCascade({
                    id,
                    secret: session.accessToken,
                })

                data = faunares.deleteTask
                break;
            }
            default:
            // code block
        }

        console.log('task response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}