import { useUser } from 'hooks/useUser'
import Button from 'components/shared/Button'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getAllFormSubmissions } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'

const FormItem = styled(Flex)`

`


const Dashboard = ({ forms, error }) => {
    const user = useUser()
    console.log({ forms, error })
    return (
        <>
            {user && (
                <>
                    <div>
                        <h1>Dark Ace Dashboard</h1>
                        {forms.map(f => {
                            return (
                                <div key={f._id}>
                                    {f.name} : {f.email}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </>
    )
}

export async function getServerSideProps({ req }) {
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        if (!session.roles.includes('admin')) {
            throw { msg: 'Must be an admin to view this page' }
        }

        const forms = await getAllFormSubmissions(session.accessToken)
        console.log('forms', forms)

        return {
            props: {
                forms: forms.allFormSubmissions.data
            }, // will be passed to the page component as props
        }
    } catch (e) {
        //Should redirect to another page
        console.log(e.msg)
        return {
            props: {
                error: 'An error occurred'
            }, // will be passed to the page component as props
        }
    }

}


export default Dashboard
