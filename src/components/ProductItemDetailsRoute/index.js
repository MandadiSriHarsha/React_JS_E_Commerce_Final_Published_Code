import {useState, useEffect} from 'react'

import {Link, useLocation} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

import Navbar from '../Navbar'
import SimilarProductItem from '../SimilarProductItem'
import CartContext from '../../context/CartContext'

import './index.css'

const ProductItemDetailsRoute = props => {
  const [pageStatus, updatePageStatus] = useState('INITIAL')
  const [quantity, updateProductQuantity] = useState(1)
  const [productDetails, updateProductDetails] = useState({})
  const [similarProductsList, updateSimilarProductsList] = useState([])

  const location = useLocation()
  const path = location.pathname

  const increaseProductQuantity = () => {
    updateProductQuantity(prevQuantity => prevQuantity + 1)
  }

  const decreaseProductQuantity = () => {
    updateProductQuantity(prevQuantity => {
      if (prevQuantity > 1) {
        return prevQuantity - 1
      }
      return prevQuantity
    })
  }

  useEffect(() => {
    const getProductItemDetails = async () => {
      updatePageStatus('LOADING')
      updateProductQuantity(1)
      updateProductDetails({})
      updateSimilarProductsList([])
      const {match} = props
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
        const fetchedProductDetails = {
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
        const fetchedSimilarProductsList = data.similar_products.map(
          eachitem => ({
            id: eachitem.id,
            availability: eachitem.availability,
            brand: eachitem.brand,
            description: eachitem.description,
            imageUrl: eachitem.image_url,
            price: eachitem.price,
            rating: eachitem.rating,
            title: eachitem.title,
            reviews: eachitem.total_reviews,
          }),
        )
        updatePageStatus('SUCCESS')
        updateProductDetails(fetchedProductDetails)
        updateSimilarProductsList(fetchedSimilarProductsList)
      } else {
        updatePageStatus('FAILURE')
      }
    }
    getProductItemDetails()
  }, [path])

  const renderEmptyView = () => <></>

  const renderLoadingView = () => (
    <div className="loader-bg-container">
      <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {
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
      <CartContext.Consumer>
        {values => {
          const {addItemToCart} = values

          const onAddItemToCart = () => {
            addItemToCart({
              id: productDetails.id,
              imageUrl: productDetails.imageUrl,
              brand: productDetails.brand,
              price: productDetails.price,
              title: productDetails.title,
              quantity,
              totalItemPrice: price * quantity,
            })
          }

          return (
            <>
              <div className="product-item-details-bg-container">
                <img
                  src={imageUrl}
                  alt={title}
                  className="product-details-home-image"
                />
                <div className="product-item-details-content-card">
                  <p className="product-item-details-content-card-heading">
                    {title}
                  </p>
                  <p className="product-item-details-content-card-price">
                    Rs {price}/-
                  </p>
                  <div className="product-item-details-rating-review-card">
                    <p className="product-item-details-rating">
                      {rating}
                      <AiFillStar className="rating-icon" />
                    </p>
                    <p className="product-item-details-reviews">
                      {reviews} Reviews
                    </p>
                  </div>
                  <p className="product-item-details-description">
                    {description}
                  </p>
                  <p className="product-item-details-availability">
                    <span className="product-item-details-span">
                      Availability:{' '}
                    </span>
                    {availability}
                  </p>
                  <p className="product-item-details-brand">
                    <span className="product-item-details-span">Brand: </span>
                    {brand}
                  </p>
                  <hr className="product-item-details-line-break" />
                  <div className="quantity-controller">
                    <button
                      className="quantity-button"
                      type="button"
                      onClick={decreaseProductQuantity}
                    >
                      <AiOutlineMinusSquare className="quantity-icon" />
                    </button>
                    <p className="product-quantity">{quantity}</p>
                    <button
                      className="quantity-button"
                      type="button"
                      onClick={increaseProductQuantity}
                    >
                      <AiOutlinePlusSquare className="quantity-icon" />
                    </button>
                  </div>
                  <button
                    className="add-to-cart-button"
                    type="button"
                    onClick={onAddItemToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-bg-container">
                {similarProductsList.map(eachitem => (
                  <SimilarProductItem key={eachitem.id} data={eachitem} />
                ))}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  const renderFailureView = () => (
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

  const renderProductItemDetailsPage = () => {
    switch (pageStatus) {
      case 'INITIAL':
        return renderEmptyView()
      case 'LOADING':
        return renderLoadingView()
      case 'SUCCESS':
        return renderSuccessView()
      case 'FAILURE':
        return renderFailureView()
      default:
        return renderFailureView()
    }
  }

  return (
    <>
      <Navbar />
      {renderProductItemDetailsPage()}
    </>
  )
}

export default ProductItemDetailsRoute
