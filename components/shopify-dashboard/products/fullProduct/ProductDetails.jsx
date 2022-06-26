import { useState } from 'react'
import styled from 'styled-components'
import ProductInfo from 'components/products/fullProduct/ProductInfo'
import ProductForm from 'components/products/fullProduct/ProductFormWithVariantList'

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

  console.log(variant)
  return (
    <Container className={className}>
      <ProductInfo
        title={productData.title}
        descriptionHtml={productData.descriptionHtml}
        price={variant.node.priceV2.amount}
      />
      {/* <ProductForm
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges}
        selectedVariant={variant}
        setSelectedVariant={setVariant}
        mainImg={productData.images.edges[0].node}
        setMainImg={setMainImg}
        options={productData.options}
      /> */}
    </Container>
  )
}

export default ProductDetails
