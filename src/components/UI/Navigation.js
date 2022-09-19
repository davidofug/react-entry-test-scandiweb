import React, { Component } from 'react'
import styled from 'styled-components/macro'
import Logo from './Logo'
import CartIcon from './CartIcon'
import{NavLink} from 'react-router-dom'
import {COLORS,FONTS} from '../constants'

// import Select from './Select'

const Nav = styled.nav`
display:flex;
width:1440px;
justify-content:space-between;
align-items:center;
background:${COLORS.WHITE}; 
font-family:${FONTS.FAMILIES.RALEWAY};
padding:10px;
width:100%;
color:${COLORS.BLACK}

`
const NavItems = styled.ul`
display:flex;
list-style-type:none;
text-transform:uppercase;
margin:28px 32px;
gap:30px;
padding-left: 16px;
padding-right:16px;

`
const NavItem = styled(NavLink)`
text-decoration:none;
color:${COLORS.BLACK};
font-family: ${FONTS.FAMILIES.RALEWAY};
&:hover{
  color: ${COLORS.GREEN};
  transition: 0.2s ease all;
  border-bottom:2px solid ${COLORS.GREEN};
 }
`
export default class Navigation extends Component {
  render() {
    return (
    
      <Nav>
        <NavItems>
           <NavItem to = '/'>Women</NavItem>
           <NavItem to = '/categorypage'>Men</NavItem>
           <NavItem to = '/productdetails'>Kids</NavItem>
         </NavItems>

      <Logo/>
  
      <section>
      <CartIcon/>
      </section>
  
     
      </Nav>
      
        
    )
  }
}

