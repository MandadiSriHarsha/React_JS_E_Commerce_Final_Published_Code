import {Component} from 'react'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'

import './index.css'

class productItemDetailsRoute extends Component {
  state = {pageStatus: 'FAILURE', quantity: 1}

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
    console.log(data)
  }

  renderLoadingView = () => (
    <div className="loader-bg-container">
      <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
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
