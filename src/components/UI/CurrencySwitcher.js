import React, { Component } from 'react'
import styled,{css} from 'styled-components/macro'
import ChevrondownIconPath from '../../assets/icons/chevrondown.png'
import { COLORS,FONTS } from 'components/constants'
const Wrapper = styled.div`
      position: relative;
      cursor: pointer;
      padding:0 10px;
  `
const SelectWrapper = styled.span`
  padding:8px;

`
 const CurrencySymbol = styled.span`
    font-family:${FONTS.FAMILIES.RALEWAY};
    font-weight:${FONTS.WEIGHTS.LARGE};
    font-size:${FONTS.SIZES.EIGHTEEN};
    line-height:28.8px;
`
const DropdownUl = styled.ul`
    position:absolute;
    padding-top:4px;
    background: #FFF;
    ${props => {return props.$currencyState ?
      css`
        display:block;
      `:
      css`
        display: none;
      `
    }};
 
    >li{
      display:block;
      list-style-type: none;
      padding:10px;
      text-decoration:none;
      font-family:${FONTS.FAMILIES.RALEWAY};
      font-size:${FONTS.SIZES.EIGHTEEN};
      font-weight:${FONTS.WEIGHTS.LARGE};
      line-height:28.8px;
      &:hover{
        background:${COLORS.BACKGROUND.GRAY};

      
      }
    }
        
`
  const ChevronIcon = styled.img`
    font-weight:${FONTS.WEIGHTS.LARGEST};
    line-height:28.8px;
    transition:transform 0.2s;
    &:hover{
      transform:rotateZ(180deg);
    }
`

const CurrencyList = styled.li`
  display:block;
`
export default class CurrencySwitcher extends Component {
   constructor(){
    super()

    this.state = {
      currencySwitch: false
    }
    
   }

  toggleCurrencySwitcher = () => {
    this.setState({currencySwitch: !this.state.currencySwitch});
  }

  render() {
    
    return (
    <Wrapper onClick={this.toggleCurrencySwitcher}>
        <CurrencySymbol>$</CurrencySymbol>
      <SelectWrapper>  
          <ChevronIcon src = {ChevrondownIconPath} alt ='Rotating-Chevron'></ChevronIcon>
      </SelectWrapper>
       <DropdownUl $currencyState= {this.state.currencySwitch}>
          <CurrencyList>USD</CurrencyList>
          <CurrencyList>EUR</CurrencyList>
          <CurrencyList>JYP</CurrencyList>
        </DropdownUl> 
    </Wrapper>

      
    )
  }
}