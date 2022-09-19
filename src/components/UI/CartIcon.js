import React, { Component } from 'react'
import CartImage from '../../assets/icons/Empty-Cart.png'
import {COLORS} from '../constants'
export default class CartIcon extends Component {
  render() {
    const styledIcon = {
      height:20,
      width :20,
      color:COLORS.EMPTY_BASKETbg.BLACK,
      

      
    }

    return (
      <img style ={styledIcon} src = {CartImage} alt ='Cart-Icon'/>
    )
  }
}
