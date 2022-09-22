import React, { Component } from 'react'
import styled,{css} from 'styled-components/macro'
import ChevrondownIconPath from '../../assets/icons/chevrondown.png'
import { COLORS,FONTS } from 'components/constants'
const Wrapper = styled.div`
      /* display:inline-block; */
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
    margin-top:10px;
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
      padding:8px;
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
    &:hover {
      transform:rotateZ(180deg);
    }
`

  const CurrencyList = styled.li`
    display:block;
    text-align:center;
    margin-top:2px;
    width:90px;
  `
export default class CurrencySwitcher extends Component {
   constructor(){
      super()
        this.wrapper = React.createRef();
        this.state = {
      currencySwitch: false
    }}

  componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
   }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  toggleCurrencySwitcher = () => {
    this.setState({currencySwitch: !this.state.currencySwitch});
  };

  handleClickOutside = (event) => {
    if (
      this.wrapper.current && !this.wrapper.current.contains(event.target)
    ) {
      this.setState({
        currencySwitch: false,
      });
    }
  };
  
  render() {
    
    return (
    <Wrapper ref={this.wrapper} onClick={this.toggleCurrencySwitcher}>
        <CurrencySymbol>$</CurrencySymbol>
      <SelectWrapper>  
          <ChevronIcon src = {ChevrondownIconPath} alt ='Rotating-Chevron'></ChevronIcon>
      </SelectWrapper>
       <DropdownUl $currencyState= {this.state.currencySwitch}>
          <CurrencyList>$ USD</CurrencyList>
          <CurrencyList>€ EUR</CurrencyList>
          <CurrencyList>¥ JYP</CurrencyList>
        </DropdownUl> 
    </Wrapper>

      
    )
  }
}