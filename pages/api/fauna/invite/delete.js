import { deleteInvite } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'



export default async function handler(req, res) {
    console.log('in delete invite function', req.body)
    // console.log('method: ', req.method)
    // console.log('headers: ', req.headers)
    // console.log('body: ', req.body)

    const {
        id
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const data = await deleteInvite({
            id,
            secret: session.accessToken
        })

        console.log('delete invite response data', data)

        res.status(200).json(data.deleteInvite)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}