import React from "react";
import parse from "html-react-parser";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import {
	setDefaultAttributes,
	setAnAttribute,
} from "components/utils/functions";
const ProductDisplayLayout = styled.section`
	width: 88%;
	gap: 20px;
	display: flex;
	margin: 0 auto;
	margin-top: 40px;
	padding-bottom: 40px;
	color: ${COLORS.BLACK};
	background-color: ${COLORS.BACKGROUND.WHITE};
	font-size: ${FONTS.SIZES.TWENTY_FOUR};
`;
const ProductImage = styled.div`
	height: 511px;
	width: 610px;
	object-fit: cover;
	flex: 3;

	> img {
		width: 100%;
		height: 100%;
	}
`;

const ProductInfo = styled.article`
	flex: 2;
`;

const ProductName = styled.h1`
	font-size: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	font-size: ${FONTS.SIZES.THIRTY};
`;

const ProductBrand = styled.h1`
	margin: 16px 0 43px 0;
	font-size: ${FONTS.FAMILIES.RALEWAY};
	font-weight: ${FONTS.WEIGHTS.LARGE};
	font-size: ${FONTS.SIZES.THIRTY};
`;

const SizeLabel = styled.h4`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	line-height: 18px;
	text-transform: uppercase;
	margin-bottom: 8px;
`;

const PriceLabel = styled.h3`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	margin: 10px 0 10px 0;
	text-transform: uppercase;
	line-height: 18px;
`;

const Price = styled.h4`
	display: block;
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.TWENTY_FOUR};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	line-height: 18px;
	margin: 10px 0 20px 0;
`;

const ColorLabel = styled.h4`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	line-height: 18px;
	text-transform: uppercase;
	margin-bottom: 10px;
`;
const Gallery = styled.aside`
	display: flex;
	align-items: flex-end;
	flex-direction: column;
	width: 80px;
	> img {
		margin-bottom: 5px;
		cursor: pointer;
	}
`;

const DescriptionText = styled.div`
	font-family: ${FONTS.FAMILIES.ROBOTO};
	font-weight: ${FONTS.WEIGHTS.MEDIUM};
	font-size: ${FONTS.SIZES.SIXTEEN};
	color: ${COLORS.BLACK};
	line-height: 25.6px;
	max-width: fit-content;
`;

const AddToCartBtn = styled(Link)`
	display: inline-block;
	width: 292px;
	height: 52px;
	line-height: 52px;
	text-align: center;
	text-decoration: none;
	margin-top: 20px;
	background-color: ${COLORS.GREEN};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.SIXTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: none;
	cursor: pointer;
	color: ${COLORS.WHITE};
	text-transform: uppercase;
`;
const ProductTile = styled.img`
	width: 79px;
	height: 80px;
`;
const Size = styled.span`
	font-family: ${FONTS.FAMILIES.ROBOTO};
	font-size: ${FONTS.SIZES.TEN};
	border: 1px solid ${COLORS.BLACK};
	width: 40px;
	height: 28px;
	display: inline-block;
	margin-right: 4px;
	text-align: center;
	line-height: 28px;
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.BLACK};
		color: ${COLORS.WHITE};
	}
`;
const ColorSwatch = styled.div`
	margin-top: 18px;
	> h3 {
		font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
		font-weight: ${FONTS.WEIGHTS.LARGER};
		font-size: ${FONTS.SIZES.EIGHTEEN};
		margin-bottom: 3px;
	}
	> span {
		display: inline-block;
		height: 36px;
		width: 36px;
		margin-right: 4px;
		border: 1px solid gray;
		border-radius: 1px;
		cursor: pointer;
	}
	> span.selected {
		border: 1px solid red;
	}
`;

class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		selectedColor: "",
		selectedSize: "",
		galleryImagePosition: 0,
		product: {},
	};

	changeImage = (position) => {
		this.setState({ galleryImagePosition: position });
	};

	componentDidMount() {
		const query = `query getProductBySlug($slug: String!) {
			product(id: $slug) {
				id
				name
				inStock
				gallery
				description
				category
				attributes {
				  name
				  items {
					value
				  }
				}
				prices {
				  amount
				  currency {
					label
					symbol
				  }
				}
				brand
			}
		}`;
		const variables = { slug: this?.props?.params?.id };
		fetch(
			`http://localhost:4000/graphql` || `${process.env.REACT_APP_URL}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ query, variables }),
			}
		)
			.then((response) => response.json())
			.then((result) => this.setState({ product: result.data.product }))
			.catch((error) => console.log(error));
	}

	render() {
		const PRODUCT = this.state.product || this.props.product;
		const { currency, symbol } = this.props;
		if (PRODUCT?.name)
			return (
				<>
					<ProductDisplayLayout>
						<Gallery>
							{PRODUCT?.gallery?.map((image, index) => (
								<ProductTile
									key={index.toString()}
									src={image}
									onClick={() => this.changeImage(index)}
									alt="gallery-thumbnails"
								/>
							))}
						</Gallery>
						<ProductImage>
							<img
								src={
									PRODUCT?.gallery[
										this.state.galleryImagePosition
									]
								}
								alt="chosen-item"
							/>
						</ProductImage>
						<ProductInfo>
							<ProductName>{PRODUCT.name}</ProductName>
							<ProductBrand>{PRODUCT.brand}</ProductBrand>
							{PRODUCT?.attributes?.length > 0 &&
								PRODUCT.attributes.map((attribute, index) => (
									<div key={index.toString()}>
										{attribute?.name === "Size" && (
											<>
												<SizeLabel>Size:</SizeLabel>
												<p>
													{attribute?.items.map(
														(size) => {
															console.log(size);
															return (
																<Size
																	isSelected={
																		size?.selected
																	}
																	id={
																		size.value
																	}
																	onClick={(
																		event
																	) => {
																		console.log(
																			{
																				name: "Size",
																				value: event
																					.target
																					.id,
																			}
																		);
																	}}
																	key={
																		size.value
																	}>
																	{size.value}
																</Size>
															);
														}
													)}
												</p>
											</>
										)}
										{attribute?.name === "Color" && (
											<ColorSwatch>
												<ColorLabel>Color:</ColorLabel>
												{attribute?.items?.map(
													(color, index) => {
														return (
															<span
																key={
																	color.value
																}
																className={
																	color?.selected
																		? "selected"
																		: ""
																}
																style={{
																	backgroundColor:
																		color.value,
																}}
																onClick={(
																	event
																) => {
																	PRODUCT[
																		"attributes"
																	] =
																		setAnAttribute(
																			PRODUCT,
																			attribute?.name,
																			index
																		);

																	this.setState(
																		{
																			selectedColor:
																				event
																					.target
																					.style
																					.backgroundColor,
																		}
																	);
																}}></span>
														);
													}
												)}
											</ColorSwatch>
										)}
									</div>
								))}
							<PriceLabel>
								Price:
								<Price>
									{PRODUCT.prices[currency].currency.symbol}
									{PRODUCT.prices[currency].amount}
									{/* {PRODUCT.prices[currency].currency.label} */}
								</Price>
							</PriceLabel>
							{PRODUCT?.inStock ? (
								<AddToCartBtn
									to="/cart"
									onClick={() => {
										const theProduct =
											setDefaultAttributes(PRODUCT);
										this.props.addToCart(theProduct);
									}}>
									Add To Cart
								</AddToCartBtn>
							) : (
								<h1>OUT OF STOCK</h1>
							)}
							<DescriptionText>
								{parse(PRODUCT.description)}
							</DescriptionText>
						</ProductInfo>
					</ProductDisplayLayout>
				</>
			);
		return (
			<>
				<h1>Product loading</h1>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	...state.productReducer,
	...state.currencyReducer,
});
const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
