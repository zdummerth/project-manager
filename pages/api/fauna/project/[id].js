import { createProject, findProjectByID, updateProjectTitle } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
    console.log('in project function', req.query)
    console.log('method: ', req.method)
    console.log('body: ', req.body)

    const {
        title,
    } = req.body

    const { id } = req.query
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'GET': {
                const faunares = await findProjectByID({
                    id,
                    secret: session.accessToken,
                })

                data = faunares.findProjectByID
                break;
            }
            case 'POST': {
                const faunares = await createProject({
                    title,
                    userId: session.userId,
                    secret: session.accessToken,
                })

                data = faunares.createProject
                break;
            }
            case 'PUT': {
                const title = req.body.title
                const { id } = req.query
                const faunares = await updateProjectTitle({
                    id,
                    title,
                    secret: session.accessToken,
                })

                data = faunares.updateProjectTitle
                break;
            }
            case 'DELETE': {
                // code block
                break;
            }
            default:
            // code block
        }

        console.log('project response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}