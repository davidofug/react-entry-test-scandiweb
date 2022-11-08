import React from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
const ProductDisplayLayout = styled.section`
	width: 86%;
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
	height: 610px;
	object-fit: cover;
	flex: 3;

	> img {
		width: 100%;
		height: 100%;
		/* object-fit: cover; is put on the parent */
	}
`;

const ProductInfo = styled.article`
	flex: 2;
	> h3 {
		font-size: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
		font-weight: ${FONTS.WEIGHTS.LARGER};
		font-size: ${FONTS.SIZES.EIGHTEEN};
	}
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
	margin-top: 18px;
	max-width: fit-content;
`;
const AddToCartBtn = styled(Link)`
	text-decoration: none;
	margin-top: 20px;
	background-color: ${COLORS.GREEN};
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.SIXTEEN};
	font-weight: ${FONTS.WEIGHTS.LARGER};
	margin-bottom: 40px;
	border: none;
	width: 100%;
	padding: 10px;
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
`;
const Price = styled.h3`
	font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
	font-weight: ${FONTS.WEIGHTS.LARGEST};
	font-size: ${FONTS.SIZES.EIGHTEEN};
	margin: 10px 0;
	line-height: 18px;
	> span {
		display: block;
		margin: 10px 0;
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
		fetch(`${process.env.REACT_APP_URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ query, variables }),
		})
			.then((response) => response.json())
			.then((result) => this.setState({ product: result.data.product }))
			.catch((error) => console.log(error));
	}

	render() {
		const PRODUCT = this.state.product || this.props.product;
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
							<h1>{PRODUCT.name}</h1>
							<h2>{PRODUCT.brand}</h2>
							{PRODUCT?.attributes?.length > 0 &&
								PRODUCT.attributes.map((attribute, index) => (
									<div key={index.toString()}>
										{attribute?.name === "Size" && (
											<>
												<h3>Size:</h3>
												<p>
													{attribute?.items.map(
														(size) => (
															<Size
																id={size.value}
																onClick={(
																	event
																) => {
																	console.log(
																		event
																			.target
																			.id
																	);
																}}
																key={
																	size.value
																}>
																{size.value}
															</Size>
														)
													)}
												</p>
											</>
										)}
										{attribute?.name === "Color" && (
											<ColorSwatch>
												<h3>Color:</h3>
												{attribute?.items?.map(
													(color) => {
														return (
															<span
																key={
																	color.value
																}
																style={{
																	backgroundColor:
																		color.value,
																}}
																onClick={(
																	event
																) => {
																	this.setState(
																		{
																			selectedColor:
																				event
																					.target
																					.style
																					.backgroundColor,
																		}
																	);
																	setTimeout(
																		() => {
																			console.log(
																				this
																					.state
																					.selectedColor
																			);
																		},
																		2000
																	);
																}}></span>
														);
													}
												)}
											</ColorSwatch>
										)}
									</div>
								))}
							<Price>
								Price:
								<span>
									{PRODUCT.prices[0].currency.symbol}
									{PRODUCT.prices[0].amount}
									{PRODUCT.prices[0].currency.label}
								</span>
							</Price>

							<AddToCartBtn
								to="/cart"
								onClick={() => this.props.addToCart(PRODUCT)}>
								Add To Cart
							</AddToCartBtn>
							<DescriptionText>
								<div
									dangerouslySetInnerHTML={{
										__html: PRODUCT.description,
									}}></div>
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
});
const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
