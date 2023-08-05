import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const ProductCard = props => {
  const {data} = props
  const {id, title, brand, price, imageUrl, rating} = data

  return (
    <Link to={`/products/${id}`} className="product-card">
      <img src={imageUrl} alt={title} className="product-image" />
      <h1 className="product-name">{title}</h1>
      <p className="product-brand">{brand}</p>
      <div className="product-price-rating-card">
        <p className="product-price">Rs {price}/-</p>
        <p className="product-rating">
          {rating}
          <AiFillStar className="rating-icon" />
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
