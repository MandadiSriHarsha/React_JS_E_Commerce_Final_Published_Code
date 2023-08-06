import {withRouter, Link, useLocation} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {FaShoppingBag, FaShoppingCart} from 'react-icons/fa'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  const location = useLocation()

  return (
    <>
      <nav className="mobile-navbar">
        <div className="mobile-navbar-header-card">
          <Link to="/home" className="mobile-navbar-link-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="mobile-navbar-header-card-logo"
            />
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="mobile-icon" />
          </button>
        </div>
        <div className="mobile-navbar-menu-card">
          <Link className="mobile-nav-link" to="/home">
            <AiFillHome
              className={`${
                location.pathname === '/home'
                  ? 'mobile-style-icon'
                  : 'mobile-icon'
              }`}
            />
          </Link>
          <Link className="mobile-nav-link" to="/products">
            <FaShoppingBag
              className={`${
                location.pathname === '/products'
                  ? 'mobile-style-icon'
                  : 'mobile-icon'
              }`}
            />
          </Link>
          <Link className="mobile-nav-link" to="/cart">
            <FaShoppingCart
              className={`${
                location.pathname === '/cart'
                  ? 'mobile-style-icon'
                  : 'mobile-icon'
              }`}
            />
          </Link>
        </div>
      </nav>
      <nav className="desktop-navbar">
        <Link to="/home" className="desktop-nav-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="desktop-logo"
          />
        </Link>
        <div className="desktop-menu-card">
          <Link
            to="/home"
            className={`${
              location.pathname === '/home'
                ? 'desktop-style-nav-link'
                : 'desktop-nav-link'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${
              location.pathname === '/products'
                ? 'desktop-style-nav-link'
                : 'desktop-nav-link'
            }`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`${
              location.pathname === '/cart'
                ? 'desktop-style-nav-link'
                : 'desktop-nav-link'
            }`}
          >
            Cart
          </Link>
          <button
            type="button"
            className="desktop-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Navbar)
