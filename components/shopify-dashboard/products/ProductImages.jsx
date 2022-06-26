import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const ImageContainer = styled.div`
    position: relative;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 350px;
    // height: 300px;
`

const ProductImages = ({ currentImageSrc , setCurrentImageSrc, images }) => {
    // console.log({ currentImageSrc })

    return (
        <div className='w-100'>
            <ImageContainer>
                {currentImageSrc
                    ? (
                        <Image
                            src={currentImageSrc}
                            layout='responsive'
                            objectFit='cover'
                            width={300}
                            height={300}
                        />
                    )
                    : (
                        <div>No image uploaded</div>
                    )}
            </ImageContainer>
            <div>
                {/* <Price cents={variant.price} />
                {attributes.data.map(a => (
                    <div key={a._id}>
                        <div>{a.name}</div>
                        <div>{a.value}</div>
                    </div>
                ))} */}

            </div>

            <div>
                {/* <StyledAddToCartButton
                            variantId={variant._id}
                            quantity={formState.quantity}
                            setAddToCartError={setAddToCartError}
                        >
                            Add To Cart
                        </StyledAddToCartButton> */}
            </div>
        </div>
    )
}

export default ProductImages
