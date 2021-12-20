import { useState } from 'react'
import styled from 'styled-components'
import { useCartContext, useAddToCartContext } from 'context/Store'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .qty {
    margin-bottom: 10px;

    input {
      width: 60px;
      margin-left: 10px;
      color: ${({ theme }) => theme.colors.text};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.brand};
      border-radius: 5px;
      padding: 5px;
      font-size: 16px;

    }
  }

  .select-wrapper {
    margin-bottom: 10px;

    select {
      color: ${({ theme }) => theme.colors.text};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.brand};
      border-radius: 5px;
      margin-left: 10px;
      padding: 5px;
      font-size: 16px;

    }

     select option {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }

  .add-to-cart {
    align-self: center;
    background: ${({ theme }) => theme.colors.brand};
    border: 1px solid ${({ theme }) => theme.colors.brand};
    border-radius: 5px;
    margin-left: 10px;
    padding: 8px;
    margin: 20px 0;
    width: 200px;
  }
`
function ProductForm({ className, title, options, handle, selectedVariant, setSelectedVariant, variants, setVariantPrice, mainImg }) {
  const [quantity, setQuantity] = useState(1)
  const [variantId, setVariantId] = useState(variants[0].node.id)
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()
  console.log('selected variant', selectedVariant.node.title)


  function handleSizeChange(e) {
    const { name, value } = JSON.parse(e)
    const currentOptions = [...selectedVariant.node.selectedOptions]

    const index = currentOptions.findIndex(opt => opt.name === name)
    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const desiredVariant = find(variants, ({ node }) =>
      isEqual(currentOptions, node.selectedOptions)
    )
    setSelectedVariant(desiredVariant)
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
        variantQuantity: quantity
      })
    }
  }

  function updateQuantity(e) {
    if (e === '') {
      setQuantity('')
    } else {
      setQuantity(Math.floor(e))
    }
  }

  return (
    <Container>
      <div className='qty'>
        <label>Qty:</label>
        <input
          type="number"
          inputMode="numeric"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => updateQuantity(e.target.value)}
          className=''
        />
      </div>

      {options.map(opt => {
        const value = selectedVariant.node.selectedOptions.find(sopt => sopt.name === opt.name).value
        // const value = selectedVariant.node.selectedOptions
        console.log('value', value)
        return (
          <div key={opt.name} className='select-wrapper'>
            <label className=''>{opt.name}:</label>
            <select
              id="size-selector"
              name="size-selector"
              onChange={(event) => handleSizeChange(JSON.stringify({ name: opt.name, value: event.target.value }))}
              value={value}
            >
              {
                opt.values.map(v => (
                  <option
                    id={v}
                    key={v}
                    value={v}
                    className='option'
                  // value={`${opt.name}:${v}`}
                  >
                    {v}
                  </option>
                ))
              }
            </select>
          </div>
        )
      })}
      <button
        className='add_to_cart'
        aria-label="cart-button"
        onClick={handleAddToCart}
        className='add-to-cart'
      >
        Add To Cart
      </button>
    </Container>
  )
}

export default ProductForm
