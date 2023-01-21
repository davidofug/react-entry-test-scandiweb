import React, { Component } from "react";
import styled from "styled-components/macro";
import { FONTS, COLORS } from "../../components/constants";
import { connect } from "react-redux";
import NextCaret from "../../assets/icons/next.png";
import PreviousCaret from "../../assets/icons/previous.png";
import { addToQuantity, reduceToQuantity } from "../../actions/cartActions";
import HeroSlider, { Slide } from "hero-slider";

const CartDisplayLayout = styled.section`
	width: 88%;
	gap: 20px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-top: 40px;
	padding-bottom: 40px;
	color: ${COLORS.BLACK};
	background-color: ${COLORS.BACKGROUND.WHITE};
	font-size: ${FONTS.SIZES.TWENTY_FOUR};
`;
const Title = styled.h2`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.THIRTY};
	color: ${COLORS.BLACK};
	margin-bottom: 35px;
`;
const CartItem = styled.div`
	display: flex;
	padding: 24px 0;
	width: 100%;
	border-top: 1px solid ${COLORS.GRAY};
`;
const ItemDescription = styled.div`
	display: flex;
	flex-direction: column;
	flex: 3;
`;
const Brand = styled.h3`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	font-size: ${FONTS.SIZES.THIRTY};
	margin-bottom: 16px;
`;
const ProductName = styled.h4`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.MEDIUM};
	font-size: ${FONTS.SIZES.THIRTY};
	margin-bottom: 20px;
`;
const PriceLabel = styled.h4`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.TWENTY_FOUR};
	color: ${COLORS.BLACK};
	margin-bottom: 20px;
`;
const Size = styled.p`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	color: ${FONTS.BLACK};
	> span {
		display: inline-block;
		height: 45px;
		width: 63px;
		text-align: center;
		line-height: 45px;
		margin-right: 4px;
		border: 1px solid gray;
		border-radius: 1px;
		cursor: pointer;
		&:hover {
			background-color: ${COLORS.BLACK};
			color: ${COLORS.WHITE};
		}
	}
	> span.selected {
		border-color: red;
	}
`;
const Color = styled.div`
	margin-top: 7px;
	> p {
		font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
		font-weight: ${FONTS.WEIGHTS.LARGEST};
		font-size: ${FONTS.SIZES.EIGHTEEN};
		margin-bottom: 3px;
	}
	> span {
		display: inline-block;
		height: 32px;
		width: 32px;
		margin-right: 4px;
		border: 1px solid gray;
		text-align: center;
		border-radius: 1px;
		cursor: pointer;
	}
	> span.selected {
		border-color: red;
	}
`;

const QuantityIcons = styled.div`
	padding: 2px;
	display: flex;
	width: 34px;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-right: 24px;
	> button {
		height: 45px;
		width: 45px;
		text-align: center;
		line-height: 45px;
		margin-bottom: 4px;
		background-color: ${COLORS.WHITE};
		border: 1px solid ${COLORS.GRAY};
		cursor: pointer;
	}
`;
const ImageContainer = styled.div`
	position: relative;
	padding: 2px;
	flex: 1;
	width: 200px;
	height: 288px;
	.hero-slider-previous-container,
	.hero-slider-next-container {
		height: 24px !important;
		width: 24px !important;
		margin-top: 220px;
		background: transparent !important;
	}
	.hero-slider-previous-container {
		margin-left: 140px;
	}
	.hero-slider-previous-container > .hero-slider-previous-button,
	.hero-slider-next-container > .hero-slider-next-button {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}
	.hero-slider-previous-container > .hero-slider-previous-button {
		background-image: url(${PreviousCaret});
	}
	.hero-slider-next-container > .hero-slider-next-button {
		background-image: url(${NextCaret});
	}
	.hero-slider-previous-button svg,
	.hero-slider-next-button svg {
		display: none;
	}
`;
const CartImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

const CheckOutDetails = styled.div`
	> p {
		margin: 8px 0;
		font-size: ${FONTS.SIZES.TWENTY_FOUR};
		font-family: ${FONTS.FAMILIES.RALEWAY};
		font-weight: ${FONTS.WEIGHTS.MEDIUM};
		> span:last-child {
			padding: 0 10px;
			font-weight: ${FONTS.WEIGHTS.LARGEST};
			font-family: ${FONTS.FAMILIES.RALEWAY};
			font-size: ${FONTS.SIZES.TWENTY_FOUR};
			margin-bottom: 16px;
		}
	}
`;
const OrderButton = styled.button`
	width: 279px;
	height: 43px;
	text-align: center;
	text-decoration: none;
	margin-top: 14px;
	background-color: ${COLORS.GREEN};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.FOURTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: none;
	padding: 16px 32px;
	cursor: pointer;
	color: ${COLORS.WHITE};
	text-transform: uppercase;
`;

class Cart extends Component {
	state = {
		tax: 0,
		quantity: 0,
		total: 0,
	};

	generateTax = (total) => {
		const tax = total * 0.21;
		this.setState({ tax: tax });
	};

	generateTotalAmount = () => {
		let grandTotal = 0;
		this.props.items.forEach((item) => {
			const quantity = item.quantity;
			const amount = item.prices[0].amount;
			const total = amount * quantity;
			grandTotal += total;
		});

		this.setState({ total: grandTotal });
		this.generateTax(grandTotal);
	};

	generateTotalQuantity = () => {
		let quantity = 0;
		this.props.items.forEach((item) => {
			quantity += item?.quantity;
		});

		this.setState({ quantity: quantity });
	};

	componentDidMount() {
		this.generateTotalAmount();
		this.generateTotalQuantity();
	}

	render() {
		const items = this.props.items;
		const currency = Number(this.props.currency);
		const currencySymbol = this.props.symbol;
		return (
			<CartDisplayLayout>
				<Title>CART</Title>
				{items?.length > 0 &&
					items.map((item, index) => (
						<CartItem key={index.toString()}>
							<ItemDescription>
								<Brand>{item.brand}</Brand>
								<ProductName>{item.name}</ProductName>
								<PriceLabel>
									{item.prices[currency].currency.symbol}
									{item.prices[currency].amount}
								</PriceLabel>

								{item?.attributes?.length > 0 &&
									item.attributes.map((attribute) => (
										<>
											{attribute?.name === "Size" && (
												<Size>
													<p>SIZE:</p>
													{attribute.items.map(
														(size) => (
															<span
																className={
																	size?.selected &&
																	"selected"
																}
																id={size.value}
																key={
																	size.value
																}>
																{size.value}
															</span>
														)
													)}
												</Size>
											)}
											{attribute?.name === "Color" && (
												<Color>
													<p>COLOR:</p>
													{attribute.items.map(
														(color) => (
															<span
																className={
																	color?.selected &&
																	"selected"
																}
																style={{
																	backgroundColor:
																		color.value,
																}}></span>
														)
													)}
												</Color>
											)}
										</>
									))}
							</ItemDescription>
							<QuantityIcons>
								<button
									onClick={() => {
										this.props.addToQuantity(index);
										this.generateTotalAmount();
										this.generateTotalQuantity();
									}}>
									+
								</button>

								<span>{item.quantity}</span>
								<button
									onClick={() => {
										this.props.reduceToQuantity(index);
										this.generateTotalAmount();
										this.generateTotalQuantity();
									}}>
									-
								</button>
							</QuantityIcons>

							<ImageContainer>
								{item.gallery.length > 0 && (
									<HeroSlider
										height={"288px"}
										width={"200px"}
										controller={{
											initialSlide: 1,
											slidingDuration: 500,
											slidingDelay: 100,
										}}>
										{item.gallery.map((galleryItem) => (
											<Slide
												background={{
													backgroundImageSrc:
														galleryItem,
												}}
											/>
										))}
									</HeroSlider>
								)}
							</ImageContainer>
						</CartItem>
					))}
				<CheckOutDetails>
					<p>
						Tax 21%:{" "}
						<span>
							{currencySymbol}
							{Number(this.state.tax).toFixed(2)}
						</span>
					</p>
					<p>
						Quantity:<span> {this.state.quantity}</span>
					</p>
					<p>
						Total:{" "}
						<span>
							{currencySymbol}
							{Number(this.state.total).toFixed(2)}
						</span>
					</p>

					<OrderButton>Order</OrderButton>
				</CheckOutDetails>
			</CartDisplayLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	...state.cartReducer,
	...state.currencyReducer,
});

const mapDispatchToProps = { addToQuantity, reduceToQuantity };
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
