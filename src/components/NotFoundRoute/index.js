import {Link} from 'react-router-dom'

import './index.css'

const NotFoundRoute = () => (
  <div className="not-found-route-bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-image"
    />
    <p className="not-found-description">
      Sorry, the page that you requested for is either removed or moved to other
      location. Kindly go back to home page.
    </p>
    <Link to="/" className="not-found-nav-link">
      Login
    </Link>
  </div>
)

export default NotFoundRoute
