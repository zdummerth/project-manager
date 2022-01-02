import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Price from 'components/products/Price'
import { useAvailability } from 'hooks/useProductAvailability'

const Container = styled.div`
 text-align: center;

 .price {
   margin: 8px 0;
 }
`
const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;

  .sold-out {
    position: absolute;
    top: 50%;
    // top: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 50%;
    padding: 10px;
    z-index: 3;
    color: white;
    border: 3px double red;
    border-radius: 5px;
    background: rgba(15, 15, 15, 1);
  }
`

function ProductCard({ product }) {
  const handle = product.node.handle
  const title = product.node.title
  const price = product.node.variants.edges[0].node.price

  const imageNode = product.node.images.edges[0].node

  const { pAvailable } = useAvailability(handle)
  // console.log('product avail', pAvailable, '  :', handle)

  return (
    <Container>
      <Link
        href={`/products/${handle}`}
        passHref
      >
        <a>
          <div>
            <div>
              {title}
            </div>
            <div className='price'>
              <Price
                currency="$"
                num={price}
                numSize="text-lg"
              />
            </div>
          </div>
          <ImageWrapper>
            {!pAvailable && (
              <div className='sold-out'>
                Sold Out!
              </div>
            )}
            <Image
              src={imageNode.originalSrc}
              alt={imageNode.altText}
              objectFit='contain'
              layout="fill"
            />
          </ImageWrapper>
        </a>
      </Link>
    </Container>
  )
}

export default ProductCard
