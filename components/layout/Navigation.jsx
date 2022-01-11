import PropTypes from 'prop-types'
import { useUser } from 'hooks/useUser'
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import styled from 'styled-components'
import { ShoppingBag, Message, Home, X, UserPin, Menu, NetworkChart, Cart, Cog } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import useAppState from 'hooks/useAppState'
import { useCartContext } from 'context/Store'
import { dimensions, colors, breakpoints } from 'styles'

const I = styled.i`
  position: relative;
  padding-left: 30px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
    padding-left: 5px;
    padding-right: 30px;
  }
`

const Nav = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 5px;
  background: ${({ theme }) => theme.colors.rgradient};
  width: 100%;

  .cart-length {
    background: ${({ theme }) => theme.colors.background};
    position: absolute;
    bottom: 7px;
    left: 20px;
    padding: 5px;
    font-weight: bold;
    border-radius: 50%;
    // border: 1px solid ${({ theme }) => theme.colors.text};
  }

  .relative {
    position: relative;
  }

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

  .menuButton:hover {
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.tablet}) {
    position: static;
    // background: transparent;
  }
`

const MobileNavbox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  z-index: 6;
  height: 100%;
  width: 100%;
  left: ${({ open }) => open ? '0' : '-100%'};
  top: 0;

  transition: all 0.2s ease-in;

  #close-button {
    align-self: flex-end;
    padding: 8px; 

    ${I} {
      padding: 0;
    }
  }

  .menu-item {
    padding: 15px 0 15px 20px;
    border-top: 1px solid gray;
  }


  li {
    padding: 15px 0 15px 20px;
    list-style-type: none;
  }

  #close-button:hover {
    cursor: pointer;
  }

  .last {
    border-bottom: 1px solid gray;
  }


  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: static;
    background: ${({ theme }) => theme.colors.rgradient};
    padding-left: 10px;

    .menu-item {
      display: flex;
      align-items: center;
      border: none;
      font-size: 10px;
      padding: 10px;
    }

    .shop {
      display: flex;
      align-items: center;
    }

    .last, .shop {
      border: none;
    }

    #shop-wrapper {
      position: relative;
    }

    #shop-wrapper:hover {
      ul {
        display: block;
        position: absolute;
        top: 25px;
        background: ${({ theme }) => theme.colors.rgradient};
        width: 200px;

        li {
          padding: 15px 0;
        }
      }
    }
  }
`

const BlankButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
`


const Header = ({ open, collections }) => {
  const { user, mutate } = useUser({ redirectTo: '/login' })

  const handleLogout = async () => {
    const loggedOut = await fetch('/api/logout')
    console.log('logged out: ', loggedOut)
    if (loggedOut) mutate(null, false)
  }

  const appState = useAppState()
  const { cart } = useCartContext()
  // console.log({ appState })
  const navItems = (
    <>
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
      {user?.isAdmin && (
        <Link
          href='/admin/dashboard'
          name='Home'
        >
          <a className='menu-item first'>
            <Cog size='22' />
            <I>Admin</I>
          </a>
        </Link>
      )}
      <Link
        href='/'
        name='Home'
      >
        <a className='menu-item first'>
          <Home size='22' />
          <I>Home</I>
        </a>
      </Link>
      <div id='shop-wrapper' className='menu-item'>
        <Link
          href='/collections/featured'
          name='Play Disc Golf'
        >
          <a className='shop'>
            <ShoppingBag size='22' />
            <I>Shop</I>
          </a>
        </Link>
        <ul className='hide-desktop'>
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
        <a className='menu-item last'>
          <Message size='22' />
          <I>Contact</I>
        </a>
      </Link>

      {user ? (
        <BlankButton
          onClick={handleLogout}
        >
          <I>Logout</I>
        </BlankButton>
      ) : (
        <Link
          href='/login'
          name='Login'
        >
          <a>
            <I>Login</I>
          </a>
        </Link>
      )}

    </>
  )

  return (
    <Nav jc='space-around'>
      <Flex
        ai='center'
        dir='column'
        className='menuButton hide-desktop'
        onClick={appState.toggleMenuOpen}
      >
        <Menu size='28' />
        {/* <I>Menu</I> */}
      </Flex>
      <Link
        href='/'
        name='Home'
      >
        <a className='hide-desktop'>
          <Image
            src={'/images/da-logo-square.png'}
            alt={"Logo"}
            height={50}
            width={50}
          />
        </a>
      </Link>
      <Link
        href='/cart'
        name='Shopping Cart'
      // className='menu-item'
      >
        <a className='hide-desktop'>
          <div className='relative'>
            <Cart size='22' />
            <span className='cart-length'>{cart.length}</span>
          </div>
        </a>
      </Link>
      <MobileNavbox open={appState.menuOpen}>
        {navItems}
      </MobileNavbox>
    </Nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
