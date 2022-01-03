import SEO from 'components/SEO'
import styled from 'styled-components'
import CartTable from 'components/cart/CartTable'
import { useCartContext } from 'context/Store'
import CollectionNavigation from 'components/layout/CollectionNavigation'
import { getCollectionSlugs } from 'lib/shopify'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .empty {
    margin: 10px;
  }

  .checkout {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    width: 150px;
    margin: 20px;
    display: block;
    border-radius: 5px;
    text-align: center;
  }
`
function CartPage({ collections }) {
  const [cart, checkoutUrl] = useCartContext()
  console.log('cart', cart)

  return (
    <Container>
      <SEO title={"Cart"} />
      {cart.length === 0 ? (
        <>
          <div className='empty'>
            Cart is Empty
          </div>
          <div className='empty'>
            Check out our collections
          </div>
          <CollectionNavigation collections={collections} />
        </>
      ) : (
        <>
          <a className='checkout' href={checkoutUrl}>
            Go To Checkout
          </a>
          <CartTable
            cart={cart}
          />
        </>
      )}
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const collections = await getCollectionSlugs()

  return {
    props: {
      collections
    },
  }
}

export default CartPage
