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
      <Spacer />
      <h2>Gallery</h2>
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
