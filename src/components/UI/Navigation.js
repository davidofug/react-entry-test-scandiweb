  import React, { Component } from 'react'
  import styled from 'styled-components/macro'
  import Logo from './Logo'
  import CartContainer from './CartContainer'
  import{NavLink} from 'react-router-dom'
  import {COLORS,FONTS} from '../constants'
  const Nav = styled.nav`
    display:flex;
    align-items:center;
    gap:32px;
    background:${COLORS.WHITE}; 
    font-family:${FONTS.FAMILIES.RALEWAY};
    color:${COLORS.BLACK};
    flex:1;
  `
  const NavItem = styled(NavLink)`
    text-decoration:none;
    padding-top:20px;
    text-transform:uppercase;
    padding-bottom:20px;
    color:${COLORS.BLACK};
    font-family: ${FONTS.FAMILIES.RALEWAY};
    border-bottom:2px solid transparent;
    &:hover{
      color: ${COLORS.GREEN};
      transition: 0.2s ease all;
      border-bottom:2px solid ${COLORS.GREEN};
    }


  `
  const LogoView = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex:1;
  `

  export default class Navigation extends Component {
    render() {
      return (
      <>
        <Nav>
        { /* <NavItems> */}
            <NavItem to = '/'>Women</NavItem>
            <NavItem to = '/categorypage'>Men</NavItem>
            <NavItem to = '/productdetails'>Kids</NavItem>
           { /* </NavItems> */}
          </Nav>
        <LogoView>
          <Logo/>
        </LogoView>
        <CartContainer/>
        </>
       
        
          
      )
    }
  }

