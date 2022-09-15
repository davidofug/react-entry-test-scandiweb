import React, { Component } from 'react'
import styled from 'styled-components/macro'
import Logo from './Logo'
import CartIcon from './CartIcon'
import{Link} from 'react-router-dom'


const Nav = styled.nav`

display:flex;
justify-content:space-between;
background:#FFF;
padding:10px;



`

const UL = styled.ul`

display:flex;
list-style-type:none;
text-transform:uppercase;
gap: 10px;

`

export default class Navigation extends Component {
  render() {
    return (
      <Nav>
      <UL>
       <li>
        <Link to = '/'>Women</Link>
       </li>
    
       <li>
        <Link to = '/'>Men</Link>
       </li>

       <li>
        <Link to = '/'>Kids</Link>
       </li>
    

      </UL>

      <Logo/>

      <section>

        <CartIcon/>
      </section>

      </Nav>
    )
  }
}

