
import React, { Component } from 'react'
import styled from 'styled-components/macro'
import { COLORS,FONTS } from 'components/constants'
import VectorIcon from '../../assets/icons/Vector.png'

const ModalView = styled.div`
  display:flex;
  justify-content:space-between;
  margin:0 32px;


`
const SelectWrapper = styled.span`
padding:0 2px;

`
const CurrencySymbol = styled.span`
  font-family:${FONTS.FAMILIES.RALEWAY};
  font-weight:${FONTS.WEIGHTS.LARGE};
  font-size:${FONTS.SIZES.EIGHTEEN};
  line-height:28.8px;
`
export default class Modal extends Component {
  render() {
    const size = {
      height:3,
      width :6,
      color:COLORS.BORDERS.BLACK,

    }
    return (
        <ModalView> 
      <CurrencySymbol>$</CurrencySymbol> 
      <SelectWrapper><img style ={size} src = {VectorIcon} alt ='Cart-Icon'/></SelectWrapper>     
      
      </ModalView>

      
    )
  }
}
