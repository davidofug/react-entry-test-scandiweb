import React, { Component } from "react";
import styled from "styled-components/macro";
import { FONTS, COLORS } from "../../components/constants";
import { connect } from "react-redux";
import { addToQuantity, reduceToQuantity } from "../../actions/cartActions";
// import Slider1 from "../../assets/icons/slider-left.png";
// import Slider2 from "../../assets/icons/slider-right.png";
const CartDisplayLayout = styled.section`
	width: 86%;
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
`;
const Color = styled.div`
	margin-top: 7px;
	> h3 {
		font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
		font-weight: ${FONTS.WEIGHTS.LARGER};
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
`;
const CartImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
`;
const SliderLeft = styled.img`
	position: absolute;
	background: ${COLORS.BLACK};
	color: ${COLORS.WHITE};
	width: 18px;
	height: 20px;
	text-align: center;
	right: 25px;
	bottom: 20px;
	z-index: 2;
	cursor: pointer;
`;

const SliderRight = styled.img`
	position: absolute;
	width: 18px;
	text-align: center;
	height: 20px;
	background: ${COLORS.BLACK};
	color: ${COLORS.WHITE};
	cursor: pointer;
	right: 50px;
	bottom: 20px;
	z-index: 2;
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
const OrderButton = styled.button`
	text-decoration: none;
	margin-top: 14px;
	background-color: ${COLORS.GREEN};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.SIXTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: none;
	color: ${COLORS.WHITE};
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
									{item.prices[0].currency.symbol}
									{item.prices[0].amount}
								</PriceLabel>

								{/* {item?.attributes?.length > 0 && item.attributes.map((attribute) => (
                      {attribute?.name === "Size" && (
                          <Size>
                            <p>Size:</p>
                            {attribute.items.map((size) => (<span id={size} key={size.value}>{size.value}</span>

                      ))}
                          </Size>
          )}
                      {attribute?.name === "Color" && (
                        <Color>
                          <h5>Color:</h5>
                          {attribute.items.map(color => (<span style={{backgroundColor: color.value}}></span>))}
                      </Color>
                  )} */}
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
								<CartImage src={item.gallery[0]}></CartImage>
								{/* <SliderLeft src={Slider1}></SliderLeft> */}
								{/* <SliderRight src={Slider2}></SliderRight> */}
							</ImageContainer>
						</CartItem>
					))}
				<CheckOutDetails>
					<ul>
						<li>Tax 21%:{Number(this.state.tax).toFixed(2)}</li>
						<li>Quantity:{this.state.quantity}</li>
						<li>Total: {Number(this.state.total).toFixed(2)}</li>
					</ul>

					<OrderButton>Order</OrderButton>
				</CheckOutDetails>
			</CartDisplayLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	...state.cartReducer,
});

const mapDispatchToProps = { addToQuantity, reduceToQuantity };
//We are not passing the second argument because at the moment we don't have any action creators to be connected to the Component.
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
