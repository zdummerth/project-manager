import React, { useState } from 'react'
import ProductImage from 'components/products/fullProduct/ProductImage'
import ProductDetails from 'components/products/fullProduct/ProductDetails'
import VariantList from 'components/products/fullProduct/VariantList'
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

function ProductSection({ product }) {
  const [variant, setVariant] = useState(product.variants.edges[0])
  const [mainImg, setMainImg] = useState(product.images.edges[0].node)
  console.log({ product })

  const handleClick = (e) => {
    console.log(e.currentTarget.dataset.id)
  }

  return (
    <Container>
      <ProductImage
        images={product.images.edges}
        mainImg={mainImg}
        setMainImg={setMainImg}
        className='images'
      />
      <ProductDetails
        className='details'
        productData={product}
        variant={variant}
        setVariant={setVariant}
        setMainImg={setMainImg}
      />
      <VariantList variants={product.variants.edges} handleClick={handleClick} />
    </Container>
  )
}

export default ProductSection
