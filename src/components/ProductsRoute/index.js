import CommonProductsSection from '../CommonProductsSection'
import PrimeDealsProductsSection from '../PrimeDealsProductsSection'
import Navbar from '../Navbar'

import './index.css'

const ProductsRoute = () => (
  <>
    <Navbar />
    <div className="products-route-bg-container">
      <PrimeDealsProductsSection />
      <CommonProductsSection />
    </div>
  </>
)

export default ProductsRoute
