import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {sortByOptions, defaultSortById, onChangeSortBy} = props

  const onChangeSortByOption = event => {
    onChangeSortBy(event.target.value)
  }

  return (
    <div className="products-header-bg-container">
      <h1 className="products-header-heading">All Products</h1>
      <div className="products-header-content-card">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by-icon-heading">Sort By</p>
        <select
          value={defaultSortById}
          className="sort-by-selector"
          onChange={onChangeSortByOption}
        >
          {sortByOptions.map(eachitem => (
            <option
              className="sort-by-option-value"
              value={eachitem.id}
              key={eachitem.id}
            >
              {eachitem.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
