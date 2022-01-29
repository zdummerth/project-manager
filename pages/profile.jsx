import { useUser } from 'lib/hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'
import UpdateHandleForm from 'components/forms/UpdateHandleForm'
import Button, { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'

import styled from 'styled-components'

const Container = styled(Flex)`
  width: 100%;
  margin: 20px;

  #handle {
      width: 100%;
  }
`

const Profile = ({ setTheme }) => {
    const { user, error, loading, updateHandle, updating, mutate } = useUser()
    const [edit, setEdit] = useState(null)

    const handleLogout = async () => {
        const loggedOut = await fetch('/api/logout')
        mutate(null)
        console.log('logged out', loggedOut)
        router.push('/login')
    }


    return (
        <Container dir='column'>
            <h1>Profile</h1>
            <Button onClick={() => setTheme("light")} outline>
                light
            </Button>
            <Button onClick={() => setTheme("dark")} outline>
                dark
            </Button>
            <Button onClick={() => setTheme("dark-shade")} outline>
                dark shade
            </Button>
            {user && (
                <>
                    {edit ? (
                        <>
                            <UpdateHandleForm
                                initHandle={user.handle}
                                onSubmit={updateHandle}
                                loading={updating}
                                close={() => setEdit(false)}
                            />
                            <Button onClick={() => setEdit(false)} outline>
                                cancel
                            </Button>
                        </>
                    ) : (
                        <Flex id='handle' ai='center' jc='space-between'>
                            <Flex>
                                <Flex style={{ marginRight: '5px' }}>
                                    handle:
                                </Flex>
                                <Flex>
                                    {user.handle}
                                </Flex>
                            </Flex>

                            <Button onClick={() => setEdit(true)} outline>
                                edit
                            </Button>
                        </Flex>
                    )}
                </>
            )}
            <BlankButton onClick={handleLogout}>Logout</BlankButton>
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
