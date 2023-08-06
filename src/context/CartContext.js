import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseCartItemQuantity: () => {},
  decreaseCartItemQuantity: () => {},
  clearCart: () => {},
})

export default CartContext
