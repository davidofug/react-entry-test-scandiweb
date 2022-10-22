import React, { Component } from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../constants";
import Actions from "./Actions";
import Logo from "./Logo";
import {connect} from 'react-redux'
import {fetchNavItems} from '../../actions/navActions'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background: ${COLORS.WHITE};
  font-family: ${FONTS.FAMILIES.RALEWAY};
  color: ${COLORS.BLACK};
`;
// const Nav = styled.nav`

// `;
const NavItem = styled.ul`
  gap: 10px;
  list-style-type: none;
  text-decoration: none;
  padding-top: 20px;
  text-transform: uppercase;
  padding-bottom: 20px;
  color: ${COLORS.BLACK};
  font-family: ${FONTS.FAMILIES.RALEWAY};
  border-bottom: 2px solid transparent;
  &:hover {
    color: ${COLORS.GREEN};
    transition: 0.2s ease all;
    border-bottom: 2px solid ${COLORS.GREEN};
  }
`;

const LogoView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;


class Navigation extends Component {
  state = {
    category: "",
    loading: true,
  };
  componentDidMount() {
    // console.log(this.props.navItems)
    // this.props.fetchNavItems()
  }

  render() {

    const {navItems} = this.props
    console.log(navItems)
    return (
      <>
      <Nav>
        {navItems?.length > 0 && navItems.map((navItem,index) => <NavItem key={index.toString()} id={navItem}>{navItem}</NavItem>)}
      </Nav>
        <LogoView>
          <Logo />
        </LogoView>
        <Actions />
      </>
    );
  }     
}

/*const mapStateToProps = (store) => {

  console.log(store)

  return ({...store.navReducer})
}*/

const mapStoreToProps = (store) => ({
  ...store.navReducer
})

const mapDispatchToProps = {
  fetchNavItems
}

export default connect(mapStoreToProps,mapDispatchToProps)(Navigation)
