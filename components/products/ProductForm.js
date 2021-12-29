import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCartContext, useAddToCartContext } from 'context/Store'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import Quantity from 'components/products/Quantity'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { colors } from 'styles'
import { useAvailability } from 'hooks/useProductAvailability'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .add-to-cart-wrapper {
    display: flex; 
    flex-direction: column;
    justify-content: center;
    font-size: 1.2rem;
    height: 100px;
  }

  .add-to-cart {
    align-self: center;
    background: ${({ theme }) => theme.colors.gradient};
    border: 1px solid ${({ theme }) => theme.colors.brand};
    border-radius: 5px;
    color: inherit;
    // margin-left: 10px;
    padding: 8px;
    // margin: 30px 0;
    width: 200px;

    :hover {
      cursor: pointer;
    }
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
function ProductForm({ className, title, options, handle, selectedVariant, setSelectedVariant, variants, mainImg, setMainImg }) {
  const [quantity, setQuantity] = useState(1)
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()

  const { pAvailable, vAvailable } = useAvailability(handle, selectedVariant)

  function handleOptionClick(name, value) {
    const currentOptions = [...selectedVariant.node.selectedOptions]

    const index = currentOptions.findIndex(opt => opt.name === name)
    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const desiredVariant = find(variants, ({ node }) =>
      isEqual(currentOptions, node.selectedOptions)
    )
    // console.log({ desiredVariant })
    setMainImg(desiredVariant.node.image)
    setSelectedVariant(desiredVariant)
  }

  const checkSelected = (name, value) => {
    const currentOptions = [...selectedVariant.node.selectedOptions]
    // console.log('Curr Opt', currentOptions)

    const index = selectedVariant.node.selectedOptions.findIndex(opt => opt.name === name)
    // console.log('Selected', currentOptions[index].value === value)

    if (currentOptions[index].value === value) {
      return true
    }
    return false
  }

  async function handleAddToCart() {
    const varId = selectedVariant.node.id
    // update store context
    if (quantity !== '') {
      addToCart({
        productTitle: title,
        productHandle: handle,
        productImage: mainImg,
        variantId: selectedVariant.node.id,
        variantPrice: selectedVariant.node.price,
        variantTitle: selectedVariant.node.title,
        variantImage: selectedVariant.node.image,
        variantQuantity: quantity
      })
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
    <Container>
      {pAvailable ? (
        <>
          <Quantity
            quantity={quantity}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
            set={setQuantity}
            className='qty'
          />
          {options.map(opt => {
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
                        onClick={() => handleOptionClick(opt.name, v)}
                      >
                        {v.toUpperCase()}
                      </OptionValue>
                    ))
                  }
                </div>
              </div>
            )
          })}
          <div className='add-to-cart-wrapper'>
            {vAvailable ? (
              <button
                className='add_to_cart'
                aria-label="cart-button"
                onClick={handleAddToCart}
                className='add-to-cart'
              >
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <div>Add To Cart</div>
                )}
              </button>
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
