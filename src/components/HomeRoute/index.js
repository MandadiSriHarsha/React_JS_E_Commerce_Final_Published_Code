import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class HomeRoute extends Component {
  state = {pageStatus: 'LOADING'}

  componentDidMount() {
    setTimeout(() => {
      this.setState({pageStatus: 'SUCCESS'})
    }, 1000)
  }

  onNavigateToProductsRoute = () => {
    const {history} = this.props
    history.push('/products')
  }

  render() {
    const {pageStatus} = this.state
    return (
      <>
        <Navbar />
        {pageStatus === 'LOADING' ? (
          <div className="home-route-loader-bg-container">
            <Loader type="ThreeDots" color="#00BBFF" height={50} width={50} />
          </div>
        ) : (
          <div className="home-page-bg-container">
            <h1 className="home-page-heading">Clothes That Get YOU Noticed</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
              alt="clothes"
              className="home-page-image"
            />
            <div className="home-page-content-card">
              <h1 className="home-page-content-card-heading">
                Clothes That Get YOU Noticed
              </h1>
              <p className="home-page-content-card-description">
                Fashion is part of the daily air and it does not quite help that
                it changes all the time. Clothes have always been a marker of
                the era and we are in a revolution. Your fashion makes you been
                seen and heard that way you are. So, celebrate the seasons new
                and exciting fashion in your own way.
              </p>
              <button
                type="button"
                onClick={this.onNavigateToProductsRoute}
                className="home-page-content-card-button"
              >
                Shop Now
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default HomeRoute
