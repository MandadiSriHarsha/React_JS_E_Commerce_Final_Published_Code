import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class LoginRoute extends Component {
  state = {
    pageStatus: 'LOADING',
    username: '',
    password: '',
    isErrorGenerated: false,
    errorMessage: '',
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({pageStatus: 'SUCCESS'})
    }, 1000)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/home')
    } else {
      this.setState({isErrorGenerated: true, errorMessage: data.error_msg})
    }
  }

  renderLoaderCard = () => (
    <Loader
      type="ThreeDots"
      color="#00BBFF"
      height={60}
      width={60}
      style={{margin: 'auto'}}
    />
  )

  renderLoginCard = () => {
    const {username, password, isErrorGenerated, errorMessage} = this.state
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="mobile-website-logo"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="login"
        />
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="form-logo"
            alt="form logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              className="input"
              value={username}
              placeholder="Username"
              id="username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="input"
              value={password}
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
          {isErrorGenerated && (
            <p className="error-message">* {errorMessage}</p>
          )}
        </form>
      </>
    )
  }

  render() {
    const {pageStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/home" />
    }
    return (
      <div className="login-page-bg-container">
        {pageStatus === 'LOADING'
          ? this.renderLoaderCard()
          : this.renderLoginCard()}
      </div>
    )
  }
}

export default LoginRoute
