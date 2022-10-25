import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../constants";
import Actions from "./Actions";
import Logo from "./Logo";
import { connect } from "react-redux";
import { fetchNavItems } from "../../actions/navActions";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background: ${COLORS.WHITE};
  font-family: ${FONTS.FAMILIES.RALEWAY};
  color: ${COLORS.WHITE};
`;

const NavItem = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 42px;
  list-style-type: none;
  padding-top: 20px;
  text-transform: uppercase;
  padding-bottom: 20px;
  color: ${COLORS.BLACK};
  font-family: ${FONTS.FAMILIES.RALEWAY};
  border-bottom: 2px solid transparent;
  transition: 0.3s ease all;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${FONTS.FAMILIES.RALEWAY};
  color: ${COLORS.BLACK};
  padding-bottom: 30px;
  &:hover {
    color: ${COLORS.GREEN};
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
  // constructor(props){
  //   super(props)
  //   // console.log(this.props)
  // }

  state = {
    category: "",
    loading: true,
  };

  componentDidMount() {
    // console.log(this.props.navItems)
    // console.log(this.props.fetchNavItems())
    // store.subscribe(() => console.log(store.getState()));
    // setTimeout(() => {},500)
  }

  render() {
    const { navItems } = this.props;
    // console.log(navItems)
    return (
      <>
        <Nav>
          <NavItem>
            {navItems.length > 0 &&
              navItems.map((navItem, index) => (
                <li key={index.toString()} id={navItem}>
                  <StyledLink to={`/${navItem}`}>{navItem}</StyledLink>
                </li>
              ))}
          </NavItem>
        </Nav>
        <LogoView>
          <Logo />
        </LogoView>
        <Actions />
      </>
    );
  }
}

const mapStoreToProps = (store) => ({
  ...store.navReducer,
});

const mapDispatchToProps = {
  fetchNavItems,
};

export default connect(mapStoreToProps, mapDispatchToProps)(Navigation);
