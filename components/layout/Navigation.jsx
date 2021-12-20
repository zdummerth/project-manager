import Link from 'next/link'
import styled from 'styled-components'
import useAppState from 'hooks/useAppState'
import { BookOpen, Cart, User } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { useUser } from 'hooks/useUser'


import { dimensions, fontSizes } from 'styles'



const Container = styled(Flex)`
    // position: fixed;
    // top: 0;
    background: black;
    height: ${dimensions.navHeight};
    width: 100%;
`

const NavItem = styled(Flex)`
    padding: 10px;
`

const Navigation = () => {

    const { toggleDonateOpen } = useAppState()
    const user = useUser()


    return (
        <Container jc='space-between' ai='center'>
            <Link href='/'>
                <a>
                    <NavItem dir='column' ai='center'>
                        <BookOpen size={fontSizes.icons} />
                    </NavItem>
                </a>
            </Link>
            <Link href={user ? '/profile' : 'login'}>
                <a>
                    <NavItem dir='column' ai='center'>
                        <User size={fontSizes.icons} />
                    </NavItem>
                </a>
            </Link>
            <Link href='/cart'>
                <a>
                    <NavItem dir='column' ai='center'>
                        <Cart size={fontSizes.icons} />
                    </NavItem>
                </a>
            </Link>
        </Container>
    )
}

export default Navigation