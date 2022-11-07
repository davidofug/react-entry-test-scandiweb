import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../constants";
import CartIcon from "./CartIcon";
import CurrencySwitcher from "./CurrencySwitcher";
// import Actions from "./Actions";
import Logo from "./Logo";
import { connect } from "react-redux";
import { fetchNavItems } from "../../actions/navActions";
import Modal from "./Modal";
import Minicart from "./Minicart";

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
	display: flex;
	gap: 15px;
	justify-content: flex-end;
	align-items: center;
	flex: 1;
`;
class Navigation extends Component {
	// constructor(props){
	//   super(props)
	//   // console.log(this.props)
	// }

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
		// console.log(this.props.navItems)
		// console.log(this.props.fetchNavItems())
		// store.subscribe(() => console.log(store.getState()));
		// setTimeout(() => {},500)

		fetch(`${process.env.REACT_APP_URL}`, {
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
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				this.setState({ navItems: result.data.categories });
			})
			.catch((error) => console.log(error));
	}

	render() {
		const { navItems } = this.state;
		return (
			<>
				<Nav>
					<NavItem>
						{navItems?.length > 0 &&
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
					{this.props?.items?.length}
				</Actions>
				{this.state.displayMinicart && (
					<Modal
						onClick={this.closeModal}
						style={{ display: "flex", justifyContent: "flex-end" }}>
						<Minicart />
					</Modal>
				)}
			</>
		);
	}
}

const mapStoreToProps = (store) => ({
	...store.navReducer,
	...store.cartReducter,
});

const mapDispatchToProps = {
	fetchNavItems,
};

export default connect(mapStoreToProps, mapDispatchToProps)(Navigation);
