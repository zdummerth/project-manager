import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Link from "next/link"
import EmailSubscriberForm from 'components/forms/NewEmailSubscriberForm'
import { breakpoints } from 'styles'


const Container = styled(Flex)`
    width: 100%;
    border-top: 1px solid gray;
    padding-top: 30px;
    padding-bottom: 20px;
    margin-top: 30px;
`

const I = styled.i`
    display: block;
    margin: 5px;
    font-size: 14px;
`

const LinkContainer = styled(Flex)`
    // width: 100%;
    margin-top: 30px;
    padding: 20px 0;
`

const Footer = () => {
    return (
        <Container dir='column' ai='center'>
            <EmailSubscriberForm />
            <LinkContainer dir='column' ai='center'>
                <Link
                    href='/'
                    name='Home'
                    id='first'
                >
                    <a>
                        <I>Home</I>
                    </a>
                </Link>
                <Link
                    href='/shop/collection/featured'
                    name='Play Disc Golf'
                >
                    <a className='' id='shop'>
                        <I>Shop</I>
                    </a>
                </Link>
                <Link
                    href='/cart'
                    name='Cart'
                >
                    <a className='menu-item'>
                        <I>Cart</I>
                    </a>
                </Link>
                <Link
                    href='/about-us'
                    name='Play Disc Golf'
                >
                    <a className='menu-item'>
                        <I>About Us</I>
                    </a>
                </Link>
                <Link
                    href='/partners'
                    name='Play Disc Golf'
                >
                    <a className='menu-item'>
                        <I>Our Partners</I>
                    </a>
                </Link>
                <Link
                    href='/contact'
                    name='Play Disc Golf'
                >
                    <a className='menu-item' id='last'>
                        <I>Contact</I>
                    </a>
                </Link>
            </LinkContainer>
            <I>
                Dark Ace Disc Golf Apparel
            </I>
        </Container>
    )
}

export default Footer