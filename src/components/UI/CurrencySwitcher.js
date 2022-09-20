
import React, { Component } from 'react'
import styled from 'styled-components/macro'
import USDCurrencyIcon from '../../assets/icons/USDCurrencyIcon.png'


const Wrapper = styled.div`
  /* display:flex;
  justify-content:space-between; */
  /* margin:0 32px; */
  cursor: pointer;
`
// const SelectWrapper = styled.span`
//   padding:0 2px;

// `
// const CurrencySymbol = styled.span`
//   font-family:${FONTS.FAMILIES.RALEWAY};
//   font-weight:${FONTS.WEIGHTS.LARGE};
//   font-size:${FONTS.SIZES.EIGHTEEN};
//   line-height:28.8px;
// `
export default class CurrencySwitcher extends Component {
  render() {
    
    return (
    <Wrapper> 
      
      <img src = {USDCurrencyIcon} alt ='USD-Currency'/>
      
    </Wrapper>

      
    )
  }
}