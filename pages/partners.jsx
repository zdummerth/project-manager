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

  #portraits {
    width: 100%;
  }
`
const ImagesWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;

  @media (min-width: ${breakpoints.desktop}) {
  }

`

export default function Home({ products }) {

  console.log({ products })
  return (
    <Container dir='column' ai='center'>
      <SEO title={"Partners"} />
      <h1>Our Partners</h1>
      <a href="https://www.locallineapparel.com/">
        <h2>Local Line Apparel</h2>
      </a>
      <ImagesWrapper>
        <Image
          src='/images/local-line-logo.jpg'
          alt='logo'
          layout="fill"
          objectFit='cover'
        />
      </ImagesWrapper>
      <a href="https://ripper-studios.com/">
        <h2>Ripper Studios</h2>
      </a>
      <ImagesWrapper>
        <Image
          src='/images/ripper-studios-logo.jpg'
          alt='logo'
          layout="fill"
          objectFit='cover'
        />
      </ImagesWrapper>
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
