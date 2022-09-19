import React, { Component } from 'react'
import styled from 'styled-components/macro'
import CartIcon from './CartIcon'
import Modal from './Modal'
const Wrapper = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    flex:1;

`

export default class CartContainer extends Component {
  render() {
    return (
      <Wrapper>
        <Modal/>
        <CartIcon/>
      </Wrapper>
    )
  }
}
