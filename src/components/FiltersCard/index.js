import {BsSearch} from 'react-icons/bs'

import './index.css'

const CategoryItem = props => {
  const {data, onChangeCategoryValue, category} = props
  const {categoryId, name} = data

  const changeCategory = () => {
    onChangeCategoryValue(categoryId)
  }

  const applyCategoryStyle =
    category === categoryId ? 'apply-category-style' : null

  return (
    <button
      type="button"
      className={`category-button ${applyCategoryStyle}`}
      onClick={changeCategory}
    >
      {name}
    </button>
  )
}

const RatingItem = props => {
  const {data, onChangeRatingValue, rating} = props
  const {ratingId, imageUrl} = data

  const applyRatingStyle = rating === ratingId ? 'apply-rating-style' : null

  const onChangeRating = () => {
    onChangeRatingValue(ratingId)
  }

  return (
    <button
      type="button"
      onClick={onChangeRating}
      className={`rating-button ${applyRatingStyle}`}
    >
      <img src={imageUrl} alt={ratingId} className="rating-image" />
    </button>
  )
}

const FiltersCard = props => {
  const {
    ratingsList,
    categoryOptions,
    searchText,
    onChangeSearchText,
    onChangeCategoryText,
    onClearFilters,
    onChangeRatingText,
    fetchProductsList,
    category,
    rating,
  } = props

  const onChangeCategoryValue = id => {
    onChangeCategoryText(id)
  }

  const onChangeRatingValue = id => {
    onChangeRatingText(id)
  }

  const onEnterSearchDown = event => {
    if (event.key === 'Enter') {
      fetchProductsList()
    }
  }

  return (
    <div className="filters-bg-container">
      <div className="filters-input-container">
        <input
          type="search"
          className="filter-search-bar"
          value={searchText}
          onChange={onChangeSearchText}
          onKeyDown={onEnterSearchDown}
          placeholder="Search"
        />
        <BsSearch className="search-icon" />
      </div>
      <ul className="category-list-bg-container">
        <h1 className="category-list-heading">Category</h1>
        {categoryOptions.map(eachitem => (
          <CategoryItem
            key={eachitem.categoryId}
            data={eachitem}
            onChangeCategoryValue={onChangeCategoryValue}
            category={category}
          />
        ))}
      </ul>
      <ul className="ratings-list-bg-container">
        <h1 className="rating-list-heading">Rating</h1>
        {ratingsList.map(eachitem => (
          <RatingItem
            key={eachitem.ratingId}
            data={eachitem}
            onChangeRatingValue={onChangeRatingValue}
            rating={rating}
          />
        ))}
      </ul>
      <button
        type="button"
        className="clear-filters-button"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersCard
