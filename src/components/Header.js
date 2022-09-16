import React, { Component } from 'react'
import Navigation from './UI/Navigation'

const HeaderWrapper =styled.header`
position: absolute;
width: 1440px;
height: 80px;
left: 0px;
top: 0px;
background:${COLORS.WHITE}

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


