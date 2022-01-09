import React from 'react'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Flex from 'components/shared/Flex'
import Image from 'next/image'
import { getAllProductsInCollection } from 'lib/shopify'
import ProductListings from 'components/products/ProductListings'
import { breakpoints, Spacer } from 'styles'

const Container = styled(Flex)`
  width: 100%;

  p {
    width: 80%;
    max-width: 400px;
    text-align: center;
  }
`
const ImagesWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`

export default function Home({ products }) {

  console.log({ products })
  return (
    <Container dir='column' ai='center'>
      <SEO title={"About Us"} />
      <h1>About Us</h1>
      <ImagesWrapper>
        <Image
          src='/images/da-logo-square.png'
          alt='logo'
          layout="fill"
          objectFit='cover'
        />
      </ImagesWrapper>
      <p>
        Established in 2020, and hailing from St. Louis, MO, Dark Ace Apparel is a brand on a mission to merge the worlds of headbangers and chainbangers.
      </p>
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
