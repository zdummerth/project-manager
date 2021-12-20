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

function ProductDetails({ productData, className }) {
  const [variantPrice, setVariantPrice] = useState(productData.variants.edges[0].node.price)
  const [variant, setVariant] = useState(productData.variants.edges[0])
  // console.log('selected variant', variant)

  return (
    <Container className={className}>
      <ProductInfo
        title={productData.title}
        description={productData.description}
        price={variantPrice}
      />
      <ProductForm
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges}
        selectedVariant={variant}
        setSelectedVariant={setVariant}
        mainImg={productData.images.edges[0].node}
        setVariantPrice={setVariantPrice}
        options={productData.options}
      />
    </Container>
  )
}

export default ProductDetails
