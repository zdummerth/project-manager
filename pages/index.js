import React from 'react'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Flex from 'components/shared/Flex'
import { getAllProductsInCollection } from 'lib/shopify'
import ProductListings from 'components/products/ProductListings'

// import StoryListing from 'components/stories/Listing'
// import RichTextEditor from 'components/cms/RichTextEditor'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ products }) {

  console.log({ products })
  return (
    <Container dir='column' ai='center'>
      <SEO title={"Home"} />
      <h2>Featured</h2>
      <ProductListings products={products} />
    </Container>
  )
}

export async function getStaticProps() {
  const { products } = await getAllProductsInCollection('featured')
  console.log('products: ', products)
  return {
    props: {
      products
    },
  }
}
