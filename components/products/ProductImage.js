import { useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'


const Container = styled.div`
  width: 100%;
  // border: 1px solid gray;
  padding: 10px;

  .thumb-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
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
  position: relative;
  width: 100%;
  height: 50vh;
`


function ProductImage({ images, mainImg, setMainImg }) {
  const ref = useRef()

  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset
  }

  return (
    <Container>
      <ImageContainer>
        <Image
          src={mainImg.originalSrc}
          alt={mainImg.altText}
          layout="fill"
          objectFit='contain'
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
                  src={imgItem.node.originalSrc}
                  alt={imgItem.node.altText}
                  layout="fill"
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
