import { useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { breakpoints } from 'styles'


const Container = styled.div`
  // width: 100%;
  // border: 1px solid gray;
  // padding: 10px;

  .thumb-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }


  .thumb {
    position: relative;
    height: 70px;
    width: 70px;
    min-width: 70px;
    background: none;
    border: none;
    margin: 3px;
    // flex-basis: 70px;
  }

  .left-scroll, .right-scroll {
    position: absolute;
    z-index: 10;
    height: 100%;
    opacity: .4;
  }

  .right-scroll {
    right: 0;
  }

  .left-scroll {
    left: 0;
  }
`

const ImageContainer = styled.div`
  // position: relative;
  display: block;
  // width: 100%;
  // overflow: hidden;
  // height: 65vh;

  @media (min-width: ${breakpoints.desktop}) {
    // height: 75vh;
  }
`


function ProductImage({ images, mainImg, setMainImg, className }) {
  const ref = useRef()

  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset
  }

  return (
    <Container className={className}>
      <ImageContainer className=''>
        <Image
          src={mainImg.src}
          alt={mainImg.altText}
          height={mainImg.height}
          width={mainImg.width}
          layout="responsive"
          // objectFit='contain'
        />
      </ImageContainer>
      <div className="thumb-wrapper">
        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="thumb-wrapper"
        >
          {
            images.map((imgItem, index) => (
              <button
                key={index}
                className="thumb"
                onClick={() => setMainImg(imgItem.node)}
              >
                <Image
                  src={imgItem.node.src}
                  alt={imgItem.node.altText}
                  layout="fill"
                  objectFit='contain'
                />
              </button>
            ))
          }
        </div>
      </div>
    </Container>
  )
}

export default ProductImage
