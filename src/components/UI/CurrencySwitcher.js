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
    z-index:100;
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
  const ListItem = styled.li`
    display:block;
    text-align:center;
    margin-top:2px;
    height:36px;
    width:114px;
    left: 1248px;
    /* top:12px; */
    background: ${props => props.$bg};

  `
export default class CurrencySwitcher extends Component {
   constructor(){
      super()
        this.wrapper = React.createRef();
        this.currencyItem =React.createRef();
        this.state = {
          currencySwitch: false,
          selectedCurrency: '$'
    }}

  componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
      document.addEventListener("mousedown", this.handleSelectedCurrency)
   }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleSelectedCurrency)

  };

  toggleCurrencySwitcher = () => {
    this.setState({currencySwitch: !this.state.currencySwitch});
  };

  handleClickOutside = (event) => {
    if (
      this.wrapper.current && !this.wrapper.current.contains(event.target)
    ) {
      this.setState({
        currencySwitch:false,
      });
    }
  };

  handleSelectedCurrency = (event) => {
    if(event.target.classList.contains('currency-item')) {
      const currency = event.target?.innerText
      const currencyParts = currency.split(' ')
      const symbol = currencyParts[0]
      // const name = currencyParts[1]

      this.setState({
        selectedCurrency: symbol
      })

      console.log(symbol)
    }

  }
  
  render() {
    
    return (
    <Wrapper ref={this.wrapper} onClick={this.toggleCurrencySwitcher}>
        <CurrencySymbol>{this.state.selectedCurrency}</CurrencySymbol>
      <SelectWrapper>  
          <ChevronIcon src = {ChevrondownIconPath} alt ='Rotating-Chevron'></ChevronIcon>
      </SelectWrapper>
       <DropdownUl $currencyState= {this.state.currencySwitch}>
          <ListItem className="currency-item" $bg={this.state.selectedCurrency === '$' ? COLORS.BACKGROUND.GRAY : ''}>$ USD</ListItem>
          <ListItem className="currency-item" $bg={this.state.selectedCurrency === '€' ? COLORS.BACKGROUND.GRAY : ''}>€ EUR</ListItem>
          <ListItem className="currency-item" $bg={this.state.selectedCurrency === '¥' ? COLORS.BACKGROUND.GRAY : ''}>¥ JYP</ListItem>
          <ListItem className="currency-item" $bg={this.state.selectedCurrency === '£' ? COLORS.BACKGROUND.GRAY : ''}>£ GBP</ListItem>
        </DropdownUl> 
    </Wrapper>

      
    )
  }
}