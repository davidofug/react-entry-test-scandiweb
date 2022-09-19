import React, { Component } from 'react'
import styled from 'styled-components/macro'
import{COLORS} from './constants'
import Navigation from './UI/Navigation'

const HeaderWrapper =styled.header`
display:flex;
justify-content:space-between;
padding-left:32px;
padding-right:32px;
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


