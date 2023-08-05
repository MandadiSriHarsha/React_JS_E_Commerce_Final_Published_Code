import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProductsRoute from './components/ProductsRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginRoute} />
      <ProtectedRoute exact path="/home" component={HomeRoute} />
      <ProtectedRoute exact path="/products" component={ProductsRoute} />
      <Route exact path="/not-found" component={NotFoundRoute} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
