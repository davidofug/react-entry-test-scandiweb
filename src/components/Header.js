import React, { Component } from 'react'
import styled from 'styled-components/macro'
import{COLORS} from './constants'
import Navigation from './UI/Navigation'
const HeaderWrapper = styled.header`
display:flex;
justify-content:space-between; 
align-items:center;
height:80px;
width:86%;
margin:0 auto;
background:${COLORS.WHITE};

`
export default class Header extends Component {
  render() {
    return (
    <HeaderWrapper>
      <Navigation/>
    </HeaderWrapper>
  
    )
  }
}


