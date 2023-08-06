import {Component} from 'react'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

import Navbar from '../Navbar'

import './index.css'

class productItemDetailsRoute extends Component {
  state = {
    pageStatus: 'FAILURE',
    quantity: 1,
    productDetails: {},
    similarProductsList: [],
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const productDetails = {
        id: data.id,
        imageUrl: data.image_url,
        brand: data.brand,
        availability: data.availability,
        description: data.description,
        price: data.price,
        rating: data.rating,
        title: data.title,
        reviews: data.total_reviews,
      }
      const similarProductsList = data.similar_products.map(eachitem => ({
        id: eachitem.id,
        availability: eachitem.availability,
        brand: eachitem.brand,
        description: eachitem.description,
        imageUrl: eachitem.image_url,
        price: eachitem.price,
        rating: eachitem.rating,
        title: eachitem.title,
        reviews: eachitem.total_reviews,
      }))
      this.setState({
        pageStatus: 'SUCCESS',
        productDetails,
        similarProductsList,
      })
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  renderLoadingView = () => (
    <div className="loader-bg-container">
      <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {productDetails, similarProductsList, quantity} = this.state
    const {
      id,
      imageUrl,
      brand,
      availability,
      description,
      price,
      rating,
      title,
      reviews,
    } = productDetails
    return (
      <>
        <div className="product-item-details-bg-container">
          <img
            src={imageUrl}
            alt={title}
            className="product-details-home-image"
          />
          <div className="product-item-details-content-card">
            <p className="product-item-details-content-card-heading">{title}</p>
            <p className="product-item-details-content-card-price">
              Rs {price}/-
            </p>
            <div className="product-item-details-rating-review-card">
              <p className="product-item-details-rating">
                {rating}
                <AiFillStar className="rating-icon" />
              </p>
              <p className="product-item-details-reviews">{reviews} Reviews</p>
            </div>
            <p className="product-item-details-description">{description}</p>
            <p className="product-item-details-availability">
              <span className="product-item-details-span">Availability: </span>
              {availability}
            </p>
            <p className="product-item-details-brand">
              <span className="product-item-details-span">Brand: </span>
              {brand}
            </p>
            <hr className="product-item-details-line-break" />
            <div className="quantity-controller">
              <button className="quantity-button" type="button">
                <AiOutlineMinusSquare className="quantity-icon" />
              </button>
              <p className="product-quantity">{quantity}</p>
              <button className="quantity-button" type="button">
                <AiOutlinePlusSquare className="quantity-icon" />
              </button>
            </div>
            <button className="add-to-cart-button" type="button">
              Add To Cart
            </button>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-details-not-found-heading">Product Not Found</h1>
      <Link to="/products" className="product-item-details-failure-view-button">
        Continue Shopping
      </Link>
    </div>
  )

  renderProductItemDetailsPage = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderProductItemDetailsPage()}
      </>
    )
  }
}

export default productItemDetailsRoute
