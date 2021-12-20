import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Price from 'components/products/Price'

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
`

function ProductCard({ product }) {
  const handle = product.node.handle
  const title = product.node.title
  const price = product.node.variants.edges[0].node.price

  const imageNode = product.node.images.edges[0].node

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
            <Image
              src={imageNode.originalSrc}
              alt={imageNode.altText}
              layout="fill"
            />
          </ImageWrapper>
        </a>
      </Link>
    </Container>
  )
}

export default ProductCard
