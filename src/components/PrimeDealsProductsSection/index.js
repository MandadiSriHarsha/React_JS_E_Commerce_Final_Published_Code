import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class PrimeDealsProductsSection extends Component {
  state = {pageStatus: 'LOADING', primeDealsList: []}

  componentDidMount() {
    this.getPrimeDealsList()
  }

  getPrimeDealsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedList = data.prime_deals.map(eachitem => ({
        id: eachitem.id,
        brand: eachitem.brand,
        price: eachitem.price,
        rating: eachitem.rating,
        imageUrl: eachitem.image_url,
        title: eachitem.title,
      }))
      this.setState({pageStatus: 'SUCCESS', primeDealsList: updatedList})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  renderLoaderCard = () => (
    <div className="prime-deals-loader-bg-container">
      <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
    </div>
  )

  renderSuccessCard = () => {
    const {primeDealsList} = this.state
    return (
      <div className="prime-deals-success-bg-container">
        <h1 className="prime-deals-success-heading">Prime Deals</h1>
        <ul className="prime-deals-products-list">
          {primeDealsList.map(eachitem => (
            <ProductCard key={eachitem.id} data={eachitem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureCard = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      className="prime-deals-failure-image"
      alt="prime deals"
    />
  )

  renderPrimeDealsPage = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'LOADING':
        return this.renderLoaderCard()
      case 'SUCCESS':
        return this.renderSuccessCard()
      case 'FAILURE':
        return this.renderFailureCard()
      default:
        return this.renderFailureCard()
    }
  }

  render() {
    return (
      <div className="prime-deals-bg-container">
        {this.renderPrimeDealsPage()}
      </div>
    )
  }
}

export default PrimeDealsProductsSection
