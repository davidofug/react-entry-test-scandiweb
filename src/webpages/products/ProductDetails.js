import React from 'react'
export default class ProductDetails extends React.Component {
    // constructor(props) {
  //   super(props)
  // }
  render() {
    const LOCATION_PARTS = window.location.pathname.split("/")
    // console.log(location)
    // console.log(this.props.data)
    const [,category,id] = LOCATION_PARTS
    // console.log(category, id)
    const CATEGORY_NAME = category.charAt(0).toUpperCase() + category.slice(1)
    const PRODUCTS_IN_CATEGORY = this.props.data.products.filter( product => product.categories.includes(CATEGORY_NAME))
    // console.log(PRODUCTS_IN_CATEGORY[id])
    const PRODUCT = PRODUCTS_IN_CATEGORY[id]
    return (
      <div>
        {PRODUCT.title}
        {PRODUCT.description}
        
      </div>
    )
  }
}
