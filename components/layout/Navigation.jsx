import Link from 'next/link'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen, DollarCircle } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { dimensions, fontSizes } from 'styles'



const Container = styled(Flex)`
    height: ${dimensions.navHeight};
    width: 100%;
`

const NavItem = styled(Flex)`
    padding: 10px;
`

const NavItemText = styled.i`
//   position: relative;
  font-size: 14px;
`

const Navigation = ({ setAppState, donateOpen }) => {

    const handleClick = () => {
        setAppState(prev => ({
            ...prev,
            donateOpen: !donateOpen
        }))
    }
    return (
        <Container jc='space-between' ai='center'>
            <Link href='/'>
                <a>
                    <NavItem dir='column' ai='center'>
                        <BookOpen size={fontSizes.icons} />
                    </NavItem>
                </a>
            </Link>
            <NavItem onClick={handleClick}>
                <DollarCircle size={fontSizes.icons} />
            </NavItem>
        </Container>
    )
}

export default Navigation