import React from 'react'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Flex from 'components/shared/Flex'
import Image from 'next/image'
import { LinkExternal } from '@styled-icons/boxicons-regular'
import { getAllProductsInCollection } from 'lib/shopify'
import ProductListings from 'components/products/ProductListings'
import { breakpoints, Spacer } from 'styles'

const Container = styled(Flex)`
  width: 100%;

  #portraits {
    width: 100%;
  }

  #register {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    width: 150px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    text-align: center;
  }

  #league {
    text-align: center;
  }
`
const ImagesWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 40vh;
  max-height: 40vh;

  &.portrait {
    width: 50%;
    height: 45vh;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 45vh
  }

`

const AllImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    & > * {
      flex: 1;
    }
  }
`

export default function Home({ products }) {

  console.log({ products })
  return (
    <Container dir='column' ai='center'>
      <SEO title={"Home"} />
      <h2>Featured</h2>
      <ProductListings products={products} />
      <Spacer />
      <Flex id='league' dir='column' ai='center'>
        <h2>Putting League At 4 Hands Brewery</h2>
        <p>
          Random Draw Doubles
        </p>
        <p>
          The top three teams will receive cash payout as well as all 4Hands products and well liquor comped from their tab!
        </p>
        <p>
          Each player will receive their first beer (either City Wide or Full Life) free as well as 25% off their tab.
        </p>
        <h3>Upcoming Dates</h3>
        <p>
          - January 24th
        </p>
        <p>
          - January 31st
        </p>
        <p>
          <a
            id='register'
            href="https://www.eventbrite.com/e/dark-ace-weekly-putting-league-tickets-238956213467"
          >
            Register
            <LinkExternal size='22' />
          </a>
        </p>
      </Flex>
      <Spacer />
      <AllImagesWrapper>
        <ImagesWrapper>
          <Image
            src='/images/group.jpg'
            alt='logo'
            layout="fill"
            objectFit='cover'
          />
        </ImagesWrapper>
        <Flex id='portraits'>
          <ImagesWrapper className='portrait'>
            <Image
              src='/images/burrs.jpg'
              alt='logo'
              layout="fill"
              objectFit='cover'
            />
          </ImagesWrapper>
          <ImagesWrapper className='portrait'>
            <Image
              src='/images/homies.jpg'
              alt='logo'
              layout="fill"
              objectFit='cover'
            />
          </ImagesWrapper>
        </Flex>
        <ImagesWrapper>
          <Image
            src='/images/biofreezearmy.jpg'
            alt='logo'
            layout="fill"
            objectFit='cover'
          />
        </ImagesWrapper>
      </AllImagesWrapper>
    </Container>
  )
}

export async function getStaticProps() {
  const { products } = await getAllProductsInCollection('featured')
  // console.log('products: ', products)
  return {
    props: {
      products
    },
  }
}
