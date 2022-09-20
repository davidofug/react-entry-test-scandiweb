import React, { Component } from 'react'
import CartIconPath from '../../assets/icons/Empty-Cart.png'
import styled from 'styled-components/macro'
import {COLORS} from '../constants'

const CartImage = styled.img`
  cursor: pointer;
  height:20px;
  width :20px;
  color: ${COLORS.EMPTY_BASKETbg.BLACK};
`

export default class CartIcon extends Component {
  render() {
    

    return (
        <CartImage src={CartIconPath} alt ='Cart-Icon' />
    )
  }
}
