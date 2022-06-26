import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
// import Price from 'components/products/Price'

const ImageContainer = styled.div`
    height: 50px;
    width: 50px;
`

const Product = ({ product }) => {
    // console.log('product', product)

    if(product.metafields.edges.length) {
        console.log('metafields', product.metafields.edges)
    }
    return (
        <div className='flex border std-div'>
            <ImageContainer className='mr-s border'>
                {product.featuredImage && (
                    <Image
                        src={product.featuredImage.url}
                        objectFit='cover'
                        width={50}
                        height={50}
                    />
                )}
            </ImageContainer>
            <h4 className='mb-xs'>{product.title}</h4>
            <div></div>
        </div>
    )
}

export default Product
