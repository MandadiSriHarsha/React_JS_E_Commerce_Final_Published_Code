import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarProductItem = props => {
  const {data} = props
  const {id, title, brand, price, imageUrl, rating} = data

  return (
    <Link to={`/products/${id}`} className="similar-product-card">
      <img src={imageUrl} alt={title} className="similar-product-image" />
      <h1 className="similar-product-name">{title}</h1>
      <p className="similar-product-brand">{brand}</p>
      <div className="similar-product-price-rating-card">
        <p className="similar-product-price">Rs {price}/-</p>
        <p className="similar-product-rating">
          {rating}
          <AiFillStar className="similar-product-rating-icon" />
        </p>
      </div>
    </Link>
  )
}

export default SimilarProductItem
