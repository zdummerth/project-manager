import SEO from 'components/SEO'
import styled from 'styled-components'
import CartTable from 'components/cart/CartTable'
import { useCartContext } from 'context/Store'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .checkout {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    width: 150px;
    // margin: 30px;
    display: block;
    border-radius: 5px;
    text-align: center;
  }
`
function CartPage() {
  const [cart, checkoutUrl] = useCartContext()

  return (
    <Container>
      <SEO title={"Cart"} />
      <a className='checkout' href={checkoutUrl}>
        Go To Checkout
      </a>
      <CartTable
        cart={cart}
      />
    </Container>
  )
}

export default CartPage
