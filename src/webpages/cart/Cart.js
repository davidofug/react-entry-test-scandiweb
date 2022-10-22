import React, { Component } from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    console.log(this.props)
    return (
      <div>Cart</div>
    )
  }
}

const mapStateToProps = (state)=>({
  items: state.items.items
})

// const mapDispatchToProps = {}
//We are not passing the second argument because at the moment we don't have any action creators to be connected to the Component.
export default connect(mapStateToProps)(Cart)