import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {
    data,
    removeItemFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = props
  const {id, imageUrl, brand, price, totalItemPrice, title, quantity} = data

  const removeCartItem = () => {
    removeItemFromCart(id)
  }

  const increaseCartItem = () => {
    increaseCartItemQuantity({id, price})
  }

  const decreaseCartItem = () => {
    decreaseCartItemQuantity({id, price})
  }

  return (
    <li className="cart-item">
      <img src={imageUrl} alt={title} className="cart-item-image" />
      <div className="cart-item-content-card">
        <div className="cart-item-header-card">
          <p className="cart-item-header-card-heading">{title}</p>
          <p className="cart-item-header-card-description">{brand}</p>
        </div>
        <div className="cart-item-quantity-card">
          <button
            className="cart-item-decrease-button"
            type="button"
            onClick={decreaseCartItem}
          >
            <AiOutlineMinusSquare className="cart-item-decrease-icon" />
          </button>
          <p className="cart-item-quantity">{quantity}</p>
          <button
            className="cart-item-increase-button"
            type="button"
            onClick={increaseCartItem}
          >
            <AiOutlinePlusSquare className="cart-item-increase-icon" />
          </button>
        </div>
        <p className="cart-item-item-total-price">Rs {totalItemPrice}/-</p>
      </div>
      <button
        className="cart-item-delete-item-button"
        type="button"
        onClick={removeCartItem}
      >
        <TiDelete className="remove-icon" />
      </button>
    </li>
  )
}

export default CartItem
