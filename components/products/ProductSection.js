import ProductImage from 'components/products/ProductImage'
import ProductDetails from 'components/products/ProductDetails'
import styled from 'styled-components'
import { breakpoints, Spacer } from 'styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // border: 1px solid gray;

  .details {

  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
  }
`

function ProductSection({ productData }) {
  return (
    <Container>
      <ProductImage images={productData.images.edges} />
      <Spacer />
      <ProductDetails className='details' productData={productData} />
      <Spacer />
    </Container>
  )
}

export default ProductSection
