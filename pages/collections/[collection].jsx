import React from 'react'
import styled from 'styled-components'
import CollectionNavigation from 'components/layout/CollectionNavigation'
import Flex from 'components/shared/Flex'
import { getAllProductsInCollection, getCollectionSlugs } from 'lib/shopify'
import ProductListings from 'components/products/ProductListings'
import SEO from 'components/SEO'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ products, collectionTitle, collections }) {
  // console.log({ collections })
  return (
    <Container dir='column' ai='center'>
      <SEO title={collectionTitle} />
      <CollectionNavigation collections={collections}/>
      <h2>{collectionTitle}</h2>
      <ProductListings products={products} />
    </Container>
  )
}


export async function getStaticPaths() {
  const collectionSlugs = await getCollectionSlugs()

  const paths = collectionSlugs.map((slug) => {
    const collection = String(slug.node.handle)
    return {
      params: { collection }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { products, collectionTitle } = await getAllProductsInCollection(params.collection)
  // console.log('products: ', products)
  const collections = await getCollectionSlugs()

  return {
    props: {
      products,
      collectionTitle,
      collections
    },
  }
}
