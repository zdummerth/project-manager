import { useUser } from 'lib/hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'
import UpdateHandleForm from 'components/forms/UpdateHandleForm'
import { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'

import styled from 'styled-components'

const Container = styled(Flex)`
  width: 100%;

  #handle {
      width: 100%;
  }
`

const Profile = ({ setTheme }) => {
    const { user, error, loading, updateHandle, updating, mutate } = useUser()
    const [edit, setEdit] = useState(null)
    const router = useRouter()

    const handleLogout = async () => {
        const loggedOut = await fetch('/api/logout')
        mutate(null)
        console.log('logged out', loggedOut)
        router.push('/login')
    }


    return (
        <Container dir='column' ai='center' className='mt-s'>
            <Flex dir='column' className='std-div w-100'>
                <h2 className='alt-bg std-div w-100'>profile</h2>
                <div className="std-div alt-bg w-100 mtb-s">
                    <h3 className='mb-s'>theme</h3>
                    <Flex>
                        {['light', 'dark', 'dark-shade'].map((el, ind) => (
                            <BlankButton
                                key={el}
                                onClick={() => setTheme(el)}
                                className={`alt-div-1 bg ${ind > 0 && 'ml-xs'}`}
                            >
                                {el}
                            </BlankButton>
                        ))}
                    </Flex>
                </div>
                {user && (
                    <div className='std-div alt-bg w-100'>
                        <h3 className='mb-s'>handle</h3>
                        <Flex ai='center'>
                            @
                            <UpdateHandleForm
                                initHandle={user.handle}
                                onSubmit={updateHandle}
                                loading={updating}
                                close={() => setEdit(false)}
                            />
                        </Flex>
                    </div>
                )}
            </Flex>

            <BlankButton className='mt-s' onClick={handleLogout}>Logout</BlankButton>
        </Container>
    )
}

export async function getServerSideProps({ req, res }) {
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')
        return {
            props: {
                userId: session.userId
            },
        }
    } catch {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
}

export default Profile
