import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import FiltersCard from '../FiltersCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const sortByOptions = [
  {
    id: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    id: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

class CommonProductsSection extends Component {
  state = {
    pageStatus: 'LOADING',
    productsList: [],
    defaultSortById: sortByOptions[0].id,
    category: '',
    rating: '',
    searchText: '',
  }

  componentDidMount() {
    this.fetchProductsList()
  }

  fetchProductsList = async () => {
    this.setState({pageStatus: 'LOADING'})
    const {defaultSortById, category, rating, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products?title_search=${searchText}&rating=${rating}&category=${category}&sort_by=${defaultSortById}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedProductsList = data.products.map(eachitem => ({
        id: eachitem.id,
        brand: eachitem.brand,
        price: eachitem.price,
        rating: eachitem.rating,
        title: eachitem.title,
        imageUrl: eachitem.image_url,
      }))
      this.setState({pageStatus: 'SUCCESS', productsList: updatedProductsList})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  onChangeSortBy = id => {
    this.setState({defaultSortById: id}, this.fetchProductsList)
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  onChangeCategoryText = id => {
    this.setState({category: id}, this.fetchProductsList)
  }

  onChangeRatingText = id => {
    this.setState({rating: id}, this.fetchProductsList)
  }

  onClearFilters = () => {
    this.setState(
      {
        searchText: '',
        category: '',
        rating: '',
        defaultSortById: sortByOptions[0].id,
      },
      this.fetchProductsList,
    )
  }

  renderLoadingView = () => (
    <div className="common-products-loader-bg-container">
      <Loader type="TailSpin" color="#00BBFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {productsList, defaultSortById} = this.state
    return (
      <div className="products-route-success-view-bg-container">
        <ProductsHeader
          defaultSortById={defaultSortById}
          sortByOptions={sortByOptions}
          onChangeSortBy={this.onChangeSortBy}
        />
        <ul className="products-list-bg-container">
          {productsList.map(eachitem => (
            <ProductCard key={eachitem.id} data={eachitem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="products-route-failure-view-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-route-failure-view-image"
      />
      <h1 className="product-route-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="products-route-failure-view-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsRoute = () => {
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
    const {searchText, category, rating} = this.state
    return (
      <>
        <h1 className="products-route-common-products-main-heading">
          All Products
        </h1>
        <div className="common-products-bg-container">
          <FiltersCard
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            searchText={searchText}
            onChangeSearchText={this.onChangeSearchText}
            onClearFilters={this.onClearFilters}
            onChangeRatingText={this.onChangeRatingText}
            onChangeCategoryText={this.onChangeCategoryText}
            fetchProductsList={this.fetchProductsList}
            category={category}
            rating={rating}
          />
          {this.renderProductsRoute()}
        </div>
      </>
    )
  }
}

export default CommonProductsSection
