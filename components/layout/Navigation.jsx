import Link from 'next/link'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen  } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { dimensions, fontSizes } from 'styles'



const Container = styled(Flex)`
    height: ${dimensions.navHeight};
    width: 100%;
`

const NavItem = styled(Flex)``

const NavItemText = styled.i`
//   position: relative;
  font-size: 14px;
`

const StyledCaretUp = styled(CaretUpCircle)`
  transform: ${({ open }) => open ? 'rotate(180deg)' : 'rotate(0)'};
  transition: all 0.3s ease-in;
`

const Navigation = () => {
    return (
        <Container jc='center' ai='center'>
            <NavItem dir='column' ai='center'>
                <BookOpen size={fontSizes.icons} />
                <NavItemText>Stories</NavItemText>
            </NavItem>
        </Container>
    )
}

export default Navigation