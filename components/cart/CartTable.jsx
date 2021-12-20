import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useUpdateCartQuantityContext } from 'context/Store'
import Link from 'next/link'
import Price from 'components/products/Price'
import { getCartSubTotal } from 'utils/helpers'

const Container = styled.div`
  width: 100%;
  .quantity {
    // flex: 1;
    width: 40px;
  }

  .row {
    position: relative;
    display: flex;
    // height: 120px;
    // width: 95%;
    border: 1px solid gray;
    border-radius: 5px;
    // padding-right: 50px;
    margin: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
  }

  .image-wrapper {
    position: relative;
    width: 35%;
    height: 175px;
  }

  .remove {
    position: absolute;
    right: 8px;
    bottom: 8px;
    
    button {
      background: transparent;
      color: white;
      border: 1px solid gray;
      border-radius: 3px;
    }
  }

  .subtotal {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;

  }

  .taxes {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
`

function CartTable({ cart }) {
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  function updateItem(id, quantity) {
    updateCartQuantity(id, quantity)
  }

  return (
    <Container>
      {cartItems.map(item => (
        <div key={item.variantId} className='row'>
          <div className='image-wrapper'>
            <Image
              src={item.productImage.originalSrc}
              alt={item.productImage.altText}
              layout='fill'
              objectFit='contain'
            // height={75}
            // width={75}
            />
          </div>
          <div className='info'>
            <Link passHref href={`/products/${item.productHandle}`}>
              <a>
                {item.productTitle}, {item.variantTitle}
              </a>
            </Link>
            <div>
              <span>Qty: </span>
              <input
                type="number"
                inputMode="numeric"
                id="variant-quantity"
                name="variant-quantity"
                className='quantity'
                min="1"
                step="1"
                value={item.variantQuantity}
                onChange={(e) => updateItem(item.variantId, e.target.value)}
              />
            </div>

            <div>
              <Price
                currency="$"
                num={item.variantPrice}
                numSize="text-lg"
              />
            </div>
          </div>
          <div className='remove'>
            <button
              aria-label="delete-item"
              className=""
              onClick={() => updateItem(item.variantId, 0)}
            >
              X
            </button>
          </div>
        </div>
      ))}
      {
        subtotal === 0 ?
          null
          :
          <div className='subtotal'>
            <div>Subtotal</div>
            <div>
              <Price
                currency="$"
                num={subtotal}
                numSize="text-xl"
              />
            </div>
          </div>
      }
      <div className='taxes'>
        <i>Taxes and shipping calculated at checkout</i>

      </div>
    </Container>
  )
}

export default CartTable
