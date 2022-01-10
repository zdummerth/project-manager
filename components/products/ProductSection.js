import React, { useState } from 'react'
import ProductImage from 'components/products/ProductImage'
import ProductDetails from 'components/products/ProductDetails'
import styled from 'styled-components'
import { breakpoints, Spacer } from 'styles'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  // border: 1px solid gray;

  .details {

  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    .details {
      width: 40%;
      border: 1px solid gray;
      padding: 20px;
    }

    .images {
      flex: 1;
      border: 1px solid gray;
    }
  }
`

function ProductSection({ productData }) {
  const [variant, setVariant] = useState(productData.variants.edges[0])
  const [mainImg, setMainImg] = useState(productData.images.edges[0].node)
  // console.log({ variant })

  return (
    <Container>
      <ProductImage
        images={productData.images.edges}
        mainImg={mainImg}
        setMainImg={setMainImg}
        className='images'
      />
      <ProductDetails
        className='details'
        productData={productData}
        variant={variant}
        setVariant={setVariant}
        setMainImg={setMainImg}
      />
    </Container>
  )
}

export default ProductSection
