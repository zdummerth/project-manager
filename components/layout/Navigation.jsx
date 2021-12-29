import PropTypes from 'prop-types'
import React from 'react'
import Link from "next/link"
import styled from 'styled-components'
import { ShoppingBag, Message, Home, X, UserPin, Menu, NetworkChart, Cart } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import useAppState from 'hooks/useAppState'
import { dimensions, colors, breakpoints } from 'styles';

const FullWidth = styled(Flex)`
  background: ${({ theme }) => theme.colors.background}; 
  width: 100vw;
//   position: fixed;
  top: 0;
  z-index: 5;
`
const I = styled.i`
  position: relative;
  font-size: 12px;
`

const Nav = styled(Flex)`
  height: ${dimensions.navHeight};
  background: ${({ theme }) => theme.colors.background}; 
  width: 100%;
  max-width: 800px;

  .hide-mobile {
    display: none;
    @media (min-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .hide-desktop {
    display: block;
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  .menuButton {
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  .menuButton:hover {
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.tablet}) {
    position: static;
    background: transparent;
  }
`

const MobileNavbox = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  z-index: 6;
  height: 100%;
  width: 100%;
  left: ${({ open }) => open ? '0' : '-100%'};
  top: 0;

  transition: all 0.2s ease-in;

  ${I} {
    font-size: 18px;
    padding-left: 30px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 85%;
    background: ${({ theme }) => theme.colors.background}; 
    border-top: 1px solid gray;

    #close-button {
      align-self: flex-end;
      padding: 8px; 

      ${I} {
        padding: 0;
      }
    }
  }

  .filler {
    flex: 1;
    background: rgba(0,0,0,.75);
    display: ${({ open }) => open ? 'block' : 'none'};
  }

  .menu-item {
    padding: 15px 0 15px 20px;
    border-bottom: 1px solid gray;
  }

  .first {
    border-top: 1px solid gray;
  }

  li {
    padding: 15px 0 15px 20px;
    list-style-type: none;
  }

  #close-button:hover {
    cursor: pointer;
  }

  #first {
    border-top: 1px solid gray;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`


const Header = ({ open, collections }) => {
  const appState = useAppState()
  console.log({ appState })
  const navItems = (
    <>
      <div className="content">
        <Flex
          ai='center'
          dir='column'
          id='close-button'
          onClick={appState.toggleMenuOpen}
          className='hide-desktop'

        >
          <X size='28' />
          <I>Close</I>
        </Flex>
        <Link
          href='/'
          name='Play Disc Golf'
          id='first'
        >
          <a className='menu-item first'>
            <Home size='22' />
            <I>Home</I>
          </a>
        </Link>
        <Link
          href='/cart'
          name='Play Disc Golf'
        >
          <a className='menu-item'>
            <Cart size='22' />
            <I>Cart</I>
          </a>
        </Link>
        <Link
          href='/about-us'
          name='Play Disc Golf'
        >
          <a className='menu-item'>
            <UserPin size='22' />
            <I>About Us</I>
          </a>
        </Link>
        <Link
          href='/partners'
          name='Play Disc Golf'
        >
          <a className='menu-item'>
            <NetworkChart size='22' />
            <I>Our Partners</I>
          </a>
        </Link>
        <Link
          href='/contact'
          name='Play Disc Golf'
        >
          <a className='menu-item'>
            <Message size='22' />
            <I>Contact</I>
          </a>
        </Link>
        <Link
          href='/shop/collection/featured'
          name='Play Disc Golf'
        >
          <a className='menu-item'>
            <ShoppingBag size='22' />
            <I>Shop</I>
          </a>
        </Link>
        <ul>
          {collections.map(c => {
            return (
              <li key={c.title + c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  name={c.title}
                >
                  <a>
                    <I>{c.title}</I>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )

  return (
    <FullWidth>
      <Nav jc='space-around'>
        <Flex
          ai='center'
          dir='column'
          className='menuButton'
          onClick={appState.toggleMenuOpen}
        >
          <Menu size='28' />
          {/* <I>Menu</I> */}
        </Flex>
        <Link
          href='/cart'
          name='Play Disc Golf'
          className='menu-item'
        >
          <a>
            <Cart size='22' />
            <I>Cart</I>
          </a>
        </Link>
        {/* {navItems} */}

      </Nav>
      <MobileNavbox open={appState.menuOpen}>
        {navItems}
        <div className="filler" />
      </MobileNavbox>
    </FullWidth >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
