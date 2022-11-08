import React, { Component } from "react";
import styled, { css } from "styled-components/macro";
import { connect } from "react-redux";
import { switchCurrency } from "actions/currencyActions";
import ChevrondownIconPath from "../../assets/icons/chevrondown.png";
import { COLORS, FONTS } from "components/constants";
const Wrapper = styled.div`
	/* display:inline-block; */
	position: relative;
	cursor: pointer;
	padding: 0 10px;
`;
const SelectWrapper = styled.span`
	padding: 8px;
`;
const CurrencySymbol = styled.span`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGE};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	line-height: 28.8px;
`;
const DropdownUl = styled.ul`
	position: absolute;
	padding-top: 4px;
	margin-top: 10px;
	background: #fff;
	z-index: 100;
	${(props) => {
		return props.$currencyState
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `;
	}};

	> li {
		display: block;
		list-style-type: none;
		padding: 8px;
		text-decoration: none;
		font-family: ${FONTS.FAMILIES.RALEWAY};
		font-size: ${FONTS.SIZES.EIGHTEEN};
		font-weight: ${FONTS.WEIGHTS.LARGE};
		line-height: 28.8px;
		&:hover {
			background: ${COLORS.BACKGROUND.GRAY};
		}
	}
`;
const ChevronIcon = styled.img`
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	line-height: 28.8px;
	transition: transform 0.2s;
	&:hover {
		transform: rotateZ(180deg);
	}
`;
const ListItem = styled.li`
	display: block;
	text-align: center;
	margin-top: 2px;
	height: 36px;
	width: 114px;
	left: 1248px;
	/* top:12px; */
	background: ${(props) => props.$bg};
`;
class CurrencySwitcher extends Component {
	constructor() {
		super();
		this.wrapper = React.createRef();
		this.currencyItem = React.createRef();
		this.state = {
			currencySwitch: false,
			currencies: [],
			currencyPosition: 0,
			selectedCurrency: {},
		};
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		document.addEventListener("mousedown", this.handleSelectedCurrency);
		fetch(`${process.env.REACT_APP_URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: ` {
				currencies {
					label,
					symbol
				}
				}`,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({ currencies: result.data.currencies });
			})
			.catch((error) => console.log(error));
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
		document.removeEventListener("mousedown", this.handleSelectedCurrency);
	}

	toggleCurrencySwitcher = () => {
		this.setState({ currencySwitch: !this.state.currencySwitch });
	};

	handleClickOutside = (event) => {
		if (
			this.wrapper.current &&
			!this.wrapper.current.contains(event.target)
		) {
			this.setState({
				currencySwitch: false,
			});
		}
	};

	handleSelectedCurrency = (event) => {
		if (event.target.classList.contains("currency-item")) {
			const currency = event.target?.innerText;
			const currencyParts = currency.split(" ");
			const symbol = currencyParts[0];
			const position = event.target.getAttribute("data-position");
			this.props.switchCurrency({ position, symbol });
			this.setState({
				selectedCurrency: symbol,
			});
		}
	};

	onSelectCurrency = (index) => {
		this.setState({
			selectedCurrency: this.state.currencies[index],
			currencyPosition: index,
		});
		this.props.switchCurrency({
			position: index,
			symbol: this.state.currencies[index].symbol,
		});
	};

	render() {
		return (
			<Wrapper ref={this.wrapper} onClick={this.toggleCurrencySwitcher}>
				<CurrencySymbol>
					{this.state.selectedCurrency.symbol}
				</CurrencySymbol>
				<SelectWrapper>
					<ChevronIcon
						src={ChevrondownIconPath}
						alt="Rotating-Chevron"></ChevronIcon>
				</SelectWrapper>
				<DropdownUl $currencyState={this.state.currencySwitch}>
					{this.state.currencies.map((currency, index) => (
						<ListItem
							key={index.toString()}
							// className="currency-item"
							$bg={
								this.state.currencyPosition === index
									? COLORS.BACKGROUND.GRAY
									: ""
							}
							// data-position={index}
							onClick={() => this.onSelectCurrency(index)}>
							{currency.symbol} {currency.label}
						</ListItem>
					))}
				</DropdownUl>
			</Wrapper>
		);
	}
}

const mapStateToProps = (store) => ({
	...store.currencyReducer,
});

const mapDispatchToProps = { switchCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
