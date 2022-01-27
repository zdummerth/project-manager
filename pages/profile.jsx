import { useUser } from 'lib/hooks'
import { useState } from 'react'
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
    const { user, error, loading, updateHandle, updating } = useUser()
    const [edit, setEdit] = useState(null)


    return (
        <Container dir='column'>
            <h1>Profile</h1>
            <Button onClick={() => setTheme("light")} outline>
                light
            </Button>
            <Button onClick={() => setTheme("dark")} outline>
                dark
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
