import {Component} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProductsRoute from './components/ProductsRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemDetailsRoute from './components/ProductItemDetailsRoute'
import CartRoute from './components/CartRoute'
import CartContext from './context/CartContext'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addItemToCart = productDetails => {
    const {cartList} = this.state
    if (cartList.length === 0) {
      this.setState({cartList: [productDetails]})
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachitem => {
          let mapItem
          if (eachitem.id !== productDetails.id) {
            mapItem = eachitem
          } else {
            const updatedCartItemObject = {
              ...eachitem,
              quantity: eachitem.quantity + productDetails.quantity,
              totalItemPrice:
                eachitem.totalItemPrice + productDetails.totalItemPrice,
            }
            mapItem = updatedCartItemObject
          }
          return mapItem
        }),
      }))
    }
  }

  removeItemFromCart = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachitem => eachitem.id !== productId,
      ),
    }))
  }

  increaseCartItemQuantity = productDetails => {
    const {cartList} = this.state
    const updatedList = []
    cartList.forEach(eachitem => {
      if (eachitem.id !== productDetails.id) {
        updatedList.push(eachitem)
      } else {
        const updatedItem = {
          ...eachitem,
          quantity: eachitem.quantity + 1,
          totalItemPrice: eachitem.totalItemPrice + productDetails.price,
        }
        updatedList.push(updatedItem)
      }
    })
    this.setState({cartList: updatedList})
  }

  decreaseCartItemQuantity = productDetails => {
    const {cartList} = this.state
    const updatedList = []
    cartList.forEach(eachitem => {
      if (eachitem.id !== productDetails.id) {
        updatedList.push(eachitem)
      } else {
        const updatedItem = {
          ...eachitem,
          quantity: eachitem.quantity - 1,
          totalItemPrice: eachitem.totalItemPrice - productDetails.price,
        }
        if (updatedItem.quantity !== 0) {
          updatedList.push(updatedItem)
        }
      }
    })
    this.setState({cartList: updatedList})
  }

  clearCart = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
          increaseCartItemQuantity: this.increaseCartItemQuantity,
          decreaseCartItemQuantity: this.decreaseCartItemQuantity,
          clearCart: this.clearCart,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginRoute} />
            <ProtectedRoute exact path="/home" component={HomeRoute} />
            <ProtectedRoute exact path="/products" component={ProductsRoute} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetailsRoute}
            />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
            <Route exact path="/not-found" component={NotFoundRoute} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
