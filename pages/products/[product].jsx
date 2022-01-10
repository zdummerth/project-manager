import { getProductSlugs, getProduct } from 'lib/shopify'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import ProductSection from 'components/products/ProductSection'
import SEO from 'components/SEO'

const Container = styled.div`
  width: 100%;
  margin: 20px;
`

function ProductPage({ productData }) {
  return (
    <Container>
      <SEO title={productData.title} />
      <ProductSection productData={productData} />
    </Container>
  )
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs()

  const paths = productSlugs.map((slug) => {
    const product = String(slug.node.handle)
    return {
      params: { product }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.product)

  return {
    props: {
      productData,
    },
  }
}

export default ProductPage
