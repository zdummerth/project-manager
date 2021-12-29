import { useState } from 'react'
import styled from 'styled-components'
import ProductInfo from 'components/products/ProductInfo'
import ProductForm from 'components/products/ProductForm'

const Container = styled.div`
  // border: 1px solid gray;
  // border-radius: 5px;
  // margin: 10px;
  padding: 10px;

`

function ProductDetails({
  productData,
  className,
  variant,
  setVariant,
  setMainImg
}) {

  return (
    <Container className={className}>
      <ProductInfo
        title={productData.title}
        description={productData.description}
        price={variant.node.price}
      />
      <ProductForm
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges}
        selectedVariant={variant}
        setSelectedVariant={setVariant}
        mainImg={productData.images.edges[0].node}
        setMainImg={setMainImg}
        options={productData.options}
      />
    </Container>
  )
}

export default ProductDetails
