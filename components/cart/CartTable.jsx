import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useCartContext } from 'context/Store'
import Link from 'next/link'
import Price from 'components/products/Price'
import Quantity from 'components/products/Quantity'
import { getCartSubTotal } from 'utils/helpers'

const Container = styled.div`
  width: 100%;
  .quantity {
    width: 40px;
  }

  .row {
    position: relative;
    display: flex;
    border: 1px solid gray;
    border-radius: 5px;
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

function CartTable() {
  const { updateCartItemQuantity, cart, isLoading, error } = useCartContext()
  const subtotal = getCartSubTotal(cart)

  return (
    <Container>
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
      {cart.map(item => (
        <div key={item.variantId} className='row'>
          <div className='image-wrapper'>
            <Image
              src={item.variantImage.originalSrc}
              alt={item.productImage.altText}
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='info'>
            <Link passHref href={`/products/${item.productHandle}`}>
              <a>
                {item.productTitle}, {item.variantTitle}
              </a>
            </Link>
            <div>
              <Quantity
                quantity={item.variantQuantity}
                increase={() => updateCartItemQuantity(item.variantId, item.variantQuantity + 1)}
                decrease={() => updateCartItemQuantity(item.variantId, item.variantQuantity - 1)}
                disabled={isLoading !== ""}
                loading={isLoading === item.variantId}
                className='qty'
              />
              {(error === item.variantId) && (
                <div className='error'>Try again</div>
              )}
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
              disabled={isLoading !== ""}
              onClick={() => updateCartItemQuantity(item.variantId, 0)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default CartTable
