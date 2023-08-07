import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import CartContext from '../../context/CartContext'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import CartItem from '../CartItem'

class CartRoute extends Component {
  state = {pageStatus: 'LOADING'}

  componentDidMount() {
    setTimeout(() => {
      this.setState({pageStatus: 'SUCCESS'})
    }, 1000)
  }

  renderLoadingView = () => (
    <div className="loader-bg-container">
      <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
    </div>
  )

  renderEmptyCartView = () => (
    <div className="empty-cart-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-view-image"
      />
      <p className="empty-cart-view-heading">Your Cart Is Empty</p>
      <Link to="/products" className="empty-cart-view-button">
        Products
      </Link>
    </div>
  )

  renderSuccessView = () => (
    <div className="cart-route-bg-container">
      <CartContext.Consumer>
        {values => {
          const {
            cartList,
            removeItemFromCart,
            increaseCartItemQuantity,
            decreaseCartItemQuantity,
            clearCart,
          } = values
          let totalCartPrice = 0
          cartList.forEach(eachitem => {
            totalCartPrice += eachitem.totalItemPrice
          })
          return (
            <>
              {cartList.length === 0 ? (
                this.renderEmptyCartView()
              ) : (
                <div className="cart-list-view-bg-container">
                  <h1 className="cart-list-view-heading">My Cart</h1>
                  <button
                    className="clear-cart-button"
                    type="button"
                    onClick={clearCart}
                  >
                    Remove All
                  </button>
                  <ul className="cart-list-bg-container">
                    {cartList.map(eachitem => (
                      <CartItem
                        key={eachitem.id}
                        data={eachitem}
                        removeItemFromCart={removeItemFromCart}
                        increaseCartItemQuantity={increaseCartItemQuantity}
                        decreaseCartItemQuantity={decreaseCartItemQuantity}
                        clearCart={clearCart}
                      />
                    ))}
                  </ul>
                  <div className="checkout-bg-container">
                    <h1 className="checkout-heading">
                      Order Total:{' '}
                      <span className="checkout-heading-span">
                        Rs {totalCartPrice}/-
                      </span>
                    </h1>
                    <p className="checkout-description">
                      <span className="checkout-description-span">
                        {cartList.length}
                      </span>{' '}
                      items in cart
                    </p>
                    <button className="checkout-button" type="button">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    </div>
  )

  renderCartRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderCartRoute()}
      </>
    )
  }
}

export default CartRoute
