import React, { Component } from "react";
import styled from "styled-components/macro";
// import { Query } from "react-apollo";
import { COLORS, FONTS } from "../constants";
import Actions from "./Actions";
// import gql from "graphql-tag";
import Logo from "./Logo";

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

// const CATEGORIES = gql`
//   {
//     categories {
//       name
//     }
//   }
// `;
class Navigation extends Component {
  state = {
    category: "",
    loading: true,
  };

  render() {
    return (
      <>
        {/* <Query query={CATEGORIES}>
          {({ loading, data }) => {
            if (loading) return false;
            const {categories} = data;
            return categories.map((category) => (
              <Nav>
                <NavItem key={category.name.toString()} id={category.name}>
                  {category.name}
                </NavItem>
              </Nav>
            ));
            }}
        </Query> */}
        <LogoView>
          <Logo />
        </LogoView>
        <Actions />
      </>
    );
  }
}

export default Navigation
