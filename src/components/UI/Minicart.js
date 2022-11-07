import React, { Component } from "react";
import styled from "styled-components/macro";
import { FONTS, COLORS } from "../constants";
import { connect } from "react-redux";
// import Slider1 from "../../assets/icons/slider-left.png";
// import Slider2 from "../../assets/icons/slider-right.png";
import { addToQuantity, reduceToQuantity } from "actions/cartActions";
const MiniCartLayout = styled.aside`
	position: absolute;
	width: 325px;
	height: 600px;
	right: 78px;
	color: ${COLORS.BLACK};
	background-color: ${COLORS.WHITE};
	font-size: ${FONTS.SIZES.TWENTY_FOUR};
	padding: 32px 16px;
	overflow-y: auto;
`;

const Title = styled.h3`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.SIXTEEN};
	color: ${COLORS.BLACK};
	margin-bottom: 32px;
	> span {
		margin-right: 4px;
		color: ${COLORS.BLACK};
		font-weight: ${FONTS.WEIGHTS.NORMAL};
		font-size: ${FONTS.SIZES.SIXTEEN};
		font-family: ${FONTS.FAMILIES.RALEWAY};
	}
`;
const CartItem = styled.div`
	display: flex;
	padding: 24px 0;
	width: 100%;
`;

const ItemDescription = styled.div`
	display: flex;
	flex-direction: column;
	flex: 3;
`;
const Brand = styled.h3`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.NORMAL};
	font-size: ${FONTS.SIZES.SIXTEEN};
	margin-bottom: 4px;
`;
const ProductName = styled.h4`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.NORMAL};
	font-size: ${FONTS.SIZES.SIXTEEN};
	margin-bottom: 20px;
`;
const PriceLabel = styled.h4`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGE};
	font-size: ${FONTS.SIZES.FOURTEEN};
	line-height: 16px;
	color: ${COLORS.BLACK};
	margin-bottom: 20px;
`;
const Size = styled.div`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.MEDIUM};
	font-size: ${FONTS.SIZES.FOURTEEN};
	color: ${FONTS.BLACK};
	> p {
		margin-bottom: 8px;
	}
	> span {
		display: inline-block;
		font-family: ${FONTS.FAMILIES.SOURCE_SANS_PRO};
		font-size: ${FONTS.SIZES.FOURTEEN};
		font-weight: ${FONTS.WEIGHTS.NORMAL};
		height: 24px;
		width: 24px;
		text-align: center;
		line-height: 24px;
		margin-right: 8px;
		padding: 1px;
		border: 1px solid gray;
		cursor: pointer;
		&:hover {
			background-color: ${COLORS.BLACK};
			color: ${COLORS.WHITE};
		}
	}
`;
const ImageContainer = styled.div`
	position: relative;
	flex: 1;
	width: 325px;
	height: auto;
`;
const CartImage = styled.img`
	flex: 1;
	width: 121px;
	height: 190px;
`;

const Color = styled.div`
	margin-top: 7px;
	> h2 {
		font-family: ${FONTS.FAMILIES.RALEWAY};
		font-weight: ${FONTS.WEIGHTS.MEDIUM};
		font-size: ${FONTS.SIZES.FOURTEEN};
		color: ${COLORS.BLACK};
		margin-bottom: 3px;
	}
	> span {
		display: inline-block;
		height: 20px;
		width: 20px;
		margin-right: 8px;
		text-align: center;
		border: 1px solid ${COLORS.GREEN};
		cursor: pointer;
	}
`;
const QuantityIcons = styled.div`
	display: flex;
	width: 24px;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-right: 8px;
`;
const QtyButton = styled.button`
	height: 24px;
	width: 24px;
	text-align: center;
	line-height: 24px;
	margin-bottom: 4px;
	border: 1px solid ${COLORS.GRAY};
	cursor: pointer;
`;
const CheckOutDetails = styled.div`
	> ul {
		list-style-type: none;
	}
	> li {
		margin: 8px 0;
		font-size: ${FONTS.FAMILIES.TWENTY_FOUR};
		font-family: ${FONTS.FAMILIES.RALEWAY};
		font-weight: ${FONTS.WEIGHTS.LARGEST};
	}
`;
const SliderLeft = styled.img`
	position: absolute;
	background: ${COLORS.BLACK};
	color: ${COLORS.WHITE};
	width: 24px;
	height: 24px;
	text-align: center;
	right: 25px;
	bottom: 20px;
	z-index: 2;
	cursor: pointer;
`;
const SliderRight = styled.img`
	position: absolute;
	width: 24px;
	text-align: center;
	height: 24px;
	background: ${COLORS.BLACK};
	color: ${COLORS.WHITE};
	cursor: pointer;
	right: 50px;
	bottom: 20px;
	z-index: 2;
`;
const CheckOutTotal = styled.div`
	display: flex;
	justify-content: space-between;
	font-family: ${FONTS.FAMILIES.ROBOTO};
	font-size: ${FONTS.SIZES.SIXTEEN};
	font-weight: ${FONTS.WEIGHTS.MEDIUM};
	line-height: 18px;
	> span {
		font-size: ${FONTS.SIZES.SIXTEEN};
		font-weight: ${FONTS.WEIGHTS.LARGEST};
		font-family: ${FONTS.FAMILIES.RALEWAY};
	}
`;
const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;
const ViewBag = styled.button`
	width: 140px;
	height: 43px;
	text-decoration: none;
	margin-top: 14px;
	color: ${COLORS.BLACK};
	background-color: ${COLORS.WHITE};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.FOURTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: 1px solid gray;
	padding: 16px 32px;
	cursor: pointer;
	text-transform: uppercase;
`;
const OrderButton = styled.button`
	width: 140px;
	height: 43px;
	text-decoration: none;
	margin-top: 14px;
	background-color: ${COLORS.GREEN};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.SIXTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: none;
	padding: 16px 32px;
	cursor: pointer;
	color: ${COLORS.WHITE};
	text-transform: uppercase;
`;

class Minicart extends Component {
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
		console.log(this.props);
		return (
			<MiniCartLayout>
				<Title>
					My Bag, <span>{this.state.quantity} items</span>
				</Title>
				{items?.length > 0 &&
					items.map((item, index) => (
						<CartItem key={index.toString()}>
							<ItemDescription>
								<Brand>{item.brand}</Brand>
								<ProductName>{item.name}</ProductName>
								<PriceLabel>
									<strong>
										{item.prices[0].currency.symbol}
									</strong>
									<strong>{item.prices[0].amount}</strong>
								</PriceLabel>
								{item?.attributes?.length > 0 &&
									item.attributes.map((attribute) => (
										<>
											{attribute?.name === "Size" && (
												<Size>
													<p>Size:</p>
													{attribute.items.map(
														(size) => (
															<span
																id={size}
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
													<h5>Color:</h5>
													{attribute.items.map(
														(color) => (
															<span
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
								<QtyButton
									onClick={() => {
										this.props.addToQuantity(index);
										this.generateTotalAmount();
										this.generateTotalQuantity();
									}}>
									+
								</QtyButton>
								<span>{item.quantity}</span>
								<QtyButton
									onClick={() => {
										this.props.reduceToQuantity(index);
										this.generateTotalAmount();
										this.generateTotalQuantity();
									}}>
									-
								</QtyButton>
							</QuantityIcons>

							<ImageContainer>
								<CartImage src={item.gallery[0]}></CartImage>
								{/* <SliderLeft src={Slider1} alt = "left-chevron"></SliderLeft>
                  <SliderRight src={Slider2} alt ="right-chevron"></SliderRight>  */}
							</ImageContainer>
						</CartItem>
					))}
				<CheckOutDetails>
					<CheckOutTotal>
						<p>
							<strong>Total</strong>
						</p>
						<strong>{this.state.total}</strong>
					</CheckOutTotal>
					<ButtonContainer>
						<ViewBag>ViewBag</ViewBag>
						<OrderButton>Checkout</OrderButton>
					</ButtonContainer>
				</CheckOutDetails>
			</MiniCartLayout>
		);
	}
}
const mapStateToProps = (state) => ({
	...state.cartReducer,
});

const mapDispatchToProps = { addToQuantity, reduceToQuantity };
export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
