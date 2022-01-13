import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Price from 'components/products/Price'
import { useAvailability } from 'hooks/useProductAvailability'

const Container = styled.div`
 text-align: center;
 border: 1px solid ${({ theme }) => theme.colors.brand};

 .price {
   margin: 8px 0;
 }

  .info {
    // position: absolute;
    // top: 0;
    text-align: center;
    width: 100%;
    padding: 10px;
    z-index: 3;
    color: white;
    // border: 1px solid red;
    // border-radius: 5px;
    background: rgba(15, 15, 15, 1);
  }
`
const ImageWrapper = styled.div`
  position: relative;
  max-width: 400px;
  // height: 300px;

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

function ProductCard({ product, blurDataURL }) {
  // console.log(product)
  const handle = product.node.handle
  const title = product.node.title
  const price = product.node.variants.edges[0].node.price
  const imageNode = product.node.images.edges[0].node

  const { pAvailable } = useAvailability(handle)
  // console.log('product avail', pAvailable, '  :', handle)

  return (
    <Container>
      <div className='info'>
        <h3>
          {title}
        </h3>
        <div className='price'>
          <Price
            currency="$"
            num={price}
            numSize="text-lg"
          />
        </div>
      </div>
      <Link
        href={`/products/${handle}`}
        passHref
      >
        <a>
          <ImageWrapper>
            {!pAvailable && (
              <div className='sold-out'>
                Sold Out!
              </div>
            )}
            <Image
              src={imageNode.url}
              alt={imageNode.altText}
              width={imageNode.width}
              height={imageNode.height}
              placeholder='blur'
              blurDataURL={blurDataURL}
            // objectFit='contain'
            // layout="fill"
            />
          </ImageWrapper>
        </a>
      </Link>
    </Container>
  )
}

export default ProductCard
