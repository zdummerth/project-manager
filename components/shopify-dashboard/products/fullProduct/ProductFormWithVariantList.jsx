import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useCart } from 'hooks/useCart'
import Quantity from 'components/products/fullProduct/Quantity'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .add-to-cart-wrapper {
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // font-size: 1.2rem;
    height: 100px;
  }

  .actions {
    align-self: center;
    background: ${({ theme }) => theme.colors.gradient};
    border: 1px solid ${({ theme }) => theme.colors.brand};
    border-radius: 5px;
    color: inherit;
    font-size: 14px;
    text-align: center;
    padding: 8px;
    margin: 5px 0;
    width: 200px;

    :hover {
      cursor: pointer;
    }
  }

  .cart-button {
    background: ${({ theme, showCheckout }) => showCheckout ? 'transparent' : theme.colors.gradient};
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .option-wrapper {
    margin: 15px 0;
  }

  .qty {
    margin-top: 15px;
  }
`

const OptionValue = styled.button`
  border: ${({ selected, theme }) => (selected ? `1px solid ${theme.colors.brand}` : '1px solid rgba(232, 232, 232, .3)')};
  background: ${({ selected, theme }) => (selected ? `${theme.colors.rgradient}` : 'black')};
  // box-shadow: ${({ selected, theme }) => selected ? ` 0 0 3px ${theme.colors.lightest}` : ''};

  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  font-weight: bold;
  font-size: 16px;

  padding: 10px;
  margin-right: 8px;
  margin-top: 8px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
function ProductForm({
  options,
  selectedVariant,
  setSelectedVariant,
  variants,
  setMainImg
}) {
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const [addToCartError, setAddToCartError] = useState(false)
  const { isLoading, addToCart } = useCart()


  const pAvailable = true
  const vAvailable = true

  function handleVariantClick(id) {
    const desiredVariant = variants.find(v = v.id === id)
    // console.log({ desiredVariant })
    setMainImg(desiredVariant.node.image)
    setSelectedVariant(desiredVariant)
  }

  async function handleAddToCart() {
    const varId = selectedVariant.node.id
    // update store context
    try {
      if (quantity !== '') {
        setAddToCartError(false)
        await addToCart({
          variantId: selectedVariant.node.id,
          variantQuantity: quantity
        })
        setShowCheckout(true)
      }
    } catch {
      setAddToCartError(true)
    }
  }

  function increaseQuantity() {
    setQuantity(prev => prev + 1)
  }
  function decreaseQuantity() {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const getCurrentValue = optionName => {
    return selectedVariant.node.selectedOptions.find(opt => opt.name === optionName)?.value
  }

  return (
    <Container showCheckout={showCheckout}>
      {pAvailable ? (
        <>
          <Quantity
            quantity={quantity}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
            set={setQuantity}
            className='qty'
          />
          {selectedVariant.node.selectedOptions[0].name !== 'Title' && (
            <>
              {
                options.map(opt => {
                  // if (opt.values.length < 2) return null
                  return (
                    <div key={opt.name} className='option-wrapper'>
                      <div className=''>{`${opt.name}: ${getCurrentValue(opt.name).toUpperCase()}`}</div>
                      <div className='options'>
                        {
                          opt.values.map(v => (
                            <OptionValue
                              value={v}
                              key={`${opt.name} -${v} `}
                              selected={checkSelected(opt.name, v)}
                              onClick={() => handleVariantClick(opt.name, v)}
                            >
                              {v.toUpperCase()}
                            </OptionValue>
                          ))
                        }
                      </div>
                    </div>
                  )
                })
              }
            </>
          )}

          <div className='add-to-cart-wrapper'>
            {vAvailable ? (
              <>
                {addToCartError && (
                  <div>Unable to add to cart. Please try again.</div>
                )}
                <button
                  aria-label="cart-button"
                  onClick={handleAddToCart}
                  className='actions cart-button'
                >
                  {isLoading ? (
                    <div>...loading</div>
                  ) : (
                    <div>Add To Cart</div>
                  )}
                </button>
                {(showCheckout) && (
                  <Link href='/cart'>
                    <a className='actions'>
                      <div>View Cart</div>
                    </a>
                  </Link>
                )}
              </>
            ) : (
              <div>
                {`Out of Stock! `}
                {selectedVariant.node.selectedOptions[0].name === 'Title' ?
                  ''
                  :
                  selectedVariant.node.selectedOptions.length === 1 ?
                    ` Please select another ${selectedVariant.node.selectedOptions[0].name}`
                    :
                    `Please select another ${selectedVariant.node.selectedOptions[0].name} or ${selectedVariant.node.selectedOptions[1].name}.`}
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{
          margin: '10px'
        }}>
          This Product is sold out
        </div>
      )}
    </Container>
  )
}

export default ProductForm
