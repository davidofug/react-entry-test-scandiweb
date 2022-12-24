import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../constants";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import CurrencySwitcher from "./CurrencySwitcher";
import { connect } from "react-redux";
import { fetchNavItems } from "../../actions/navActions";
import Modal from "./Modal";
import Minicart from "./Minicart";

const Inner = styled.section`
	width: 88%;
	margin: 0 auto;
	justify-content: space-between;
	align-items: center;
	height: 80px;
	display: flex;
`;
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

const Actions = styled.div`
	position: relative;
	display: flex;
	gap: 15px;
	justify-content: flex-end;
	align-items: center;
	flex: 1;
	> span {
		position: absolute;
		background-color: ${COLORS.BLACK};
		width: 30px;
		height: 30px;
		text-align: center;
		display: flex;
		justify-content: center;
		border-radius: 100%;
		color: ${COLORS.WHITE};
		top: -30px;
		left: 30px;
	}
`;
class Navigation extends Component {
	state = {
		displayMinicart: false,
		category: "",
		navItems: [],
		loading: true,
	};

	toggleMinicart = () => {
		this.setState({ displayMinicart: !this.state.displayMinicart });
	};

	closeModal = (event) => {
		event.target.id === "modal" &&
			this.setState({ displayMinicart: false });
	};

	componentDidMount() {
		fetch(
			"http://localhost:4000/graphql" || `${process.env.REACT_APP_URL}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					query: ` {
          categories {
            name
          }
        }`,
				}),
			}
		)
			.then((response) => response.json())
			.then((result) => {
				this.setState({ navItems: result.data.categories });
			})
			.catch((error) => console.log(error));
	}

	render() {
		const { navItems } = this.state;
		return (
			<Inner>
				<Nav>
					<NavItem>
						{navItems.length > 0 &&
							navItems.map((navItem, index) => (
								<li key={index.toString()} id={navItem.name}>
									<StyledLink to={`/${navItem.name}`}>
										{navItem.name}
									</StyledLink>
								</li>
							))}
					</NavItem>
				</Nav>
				<LogoView>
					<Logo />
				</LogoView>
				<Actions>
					<CurrencySwitcher />
					<CartIcon toggleMinicart={this.toggleMinicart} />
				</Actions>
				{this.state.displayMinicart && (
					<Modal onClick={this.closeModal}>
						<Minicart />
					</Modal>
				)}
			</Inner>
		);
	}
}
const mapStoreToProps = (store) => ({
	...store.navReducer,
	...store.cartReducer,
});

const mapDispatchToProps = {
	fetchNavItems,
};

export default connect(mapStoreToProps, mapDispatchToProps)(Navigation);
