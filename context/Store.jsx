import { createContext, useContext, useState, useEffect } from 'react'
import { createShopifyCheckout, updateShopifyCheckout, setLocalData, saveLocalData } from 'utils/helpers'

const CartContext = createContext()

export function useCartContext() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {

  const [cart, setCart] = useState([])
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [error, setError] = useState("")

  // console.log('cart: ', cart)
  useEffect(() => {
    setLocalData(setCart, setCheckoutId, setCheckoutUrl)
  }, [])

  useEffect(() => {
    // do this to make sure multiple tabs are always in sync
    const onReceiveMessage = (e) => {
      console.log(e)
      setLocalData(setCart, setCheckoutId, setCheckoutUrl)
    }

    window.addEventListener("storage", onReceiveMessage);
    return () => {
      window.removeEventListener("storage", onReceiveMessage);
    }
  }, [])

  async function addToCart(newItem) {
    setisLoading('loading')
    // empty cart
    if (cart.length === 0) {
      try {
        const response = await createShopifyCheckout(newItem)
        setCart([
          ...cart,
          newItem
        ])
        setCheckoutId(response.id)
        setCheckoutUrl(response.webUrl)
        saveLocalData(newItem, response.id, response.webUrl)
      } catch {
        setError({
          id: '',
          msg: 'Unable to add to cart. Please try again'
        })
      }


    } else {
      let newCart = [...cart]
      let itemAdded = false
      // loop through all cart items to check if variant
      // already exists and update quantity
      newCart.map(item => {
        if (item.variantId === newItem.variantId) {
          item.variantQuantity += newItem.variantQuantity
          itemAdded = true
        }
      })

      let newCartWithItem = [...newCart]
      if (itemAdded) {
      } else {
        // if its a new item than add it to the end
        newCartWithItem = [...newCart, newItem]
      }

      try {
        await updateShopifyCheckout(newCartWithItem, checkoutId)
        setCart(newCartWithItem)
        saveLocalData(newCartWithItem, checkoutId, checkoutUrl)
      } catch {
        setError({
          id: '',
          msg: 'Unable to add to cart. Please try again'
        })
      }
    }
    setisLoading('')
  }

  async function updateCartItemQuantity(id, quantity) {
    setisLoading(id)
    let newQuantity = Math.floor(quantity)
    if (quantity === '') {
      newQuantity = ''
    }
    let newCart = [...cart]
    newCart.forEach(item => {
      if (item.variantId === id) {
        item.variantQuantity = newQuantity
      }
    })

    try {
      await updateShopifyCheckout(newCart, checkoutId)
      newCart = newCart.filter(i => i.variantQuantity !== 0)
      setCart(newCart)
      saveLocalData(newCart, checkoutId, checkoutUrl)
      setisLoading('')
    } catch {
      setError({
        id,
        msg: "Unable to update product. Please try again."
      })
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      checkoutUrl,
      isLoading,
      error,
      setisLoading,
      addToCart,
      updateCartItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}
