import styled from 'styled-components'
import ProductCard from 'components/products/ProductCard'
import { spacing, breakpoints } from 'styles'

const StyledListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  & > * {
    margin: ${spacing.lg};
  }

  @media (min-width: ${breakpoints.tablet}) {
    
  }
`

function ProductListings({ products }) {
  return (
    <StyledListing>
      {
        products.map((product) => (
          < ProductCard key={product.node.id} product={product} />
        ))
      }
    </StyledListing>
  )
}

export default ProductListings
