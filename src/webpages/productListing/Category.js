import React, { Component } from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
import CircleCartIcon from "../../assets/icons/Circle-Cart-Icon.png";
import { setProductDetails } from "../../actions/productActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const CategoryLayout = styled.main`
	box-sizing: border-box;
	overflow: hidden;
	color: ${COLORS.BLACK};
	width: 88%;
	margin: 0 auto;
	min-height: 100%;
`;
const CategoryName = styled.h1`
	font-family: ${FONTS.FAMILIES.RALEWAY};
	font-size: ${FONTS.SIZES.FORTY_TWO};
	font-weight: ${FONTS.WEIGHTS.MEDIUM};
	font-style: normal;
	line-height: 67.2px;
	text-transform: capitalize;
	margin-bottom: 103px;
`;
const ProductList = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
	gap: 40px;
	background-color: ${COLORS.WHITE};
	padding-bottom: 40px;
`;
const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 444px;
	padding: 16px;
	box-sizing: border-box;
	text-decoration: none;
	border-radius: 4px;
	color: ${COLORS.BLACK};
	cursor: pointer;
	&:hover {
		box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
		transition: box-shadow 400ms ease-in-out;
	}

	&::after {
		content: "";
		opacity: 0;
		background-image: url(${CircleCartIcon});
		background-size: cover;
		position: absolute;
		bottom: 46px;
		right: 20px;
		width: 52px;
		height: 52px;
		transition: opacity 500ms ease-in-out;
		z-index: 15;
	}
	&:hover::after {
		opacity: 1;
	}
`;
const OutOfStockLink = styled(Link)`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 444px;
	padding: 16px;
	box-sizing: border-box;
	text-decoration: none;
	border-radius: 4px;
	color: ${COLORS.GRAY};
	cursor: pointer;
	&:hover {
		box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
		transition: box-shadow 400ms ease-in-out;
	}

	&::after {
		content: "";
		opacity: 0;
		background-image: url(${CircleCartIcon});
		background-size: cover;
		position: absolute;
		bottom: 46px;
		right: 20px;
		width: 52px;
		height: 52px;
		transition: opacity 500ms ease-in-out;
		z-index: 15;
	}
	&:hover::after {
		opacity: 1;
	}
`;

const StyledFigure = styled.figure``;

const ProductImage = styled.img`
	height: 354px;
	width: 330px;
	object-fit: cover;
`;
const Title = styled.h4`
	margin-top: 14px;
	font-family: "Raleway";
	font-style: normal;
	color: ${COLORS.BLACK};
	font-weight: 300;
	font-size: 18px;
	margin-bottom: 4px;
	> span {
		margin-left: 6px;
	}
`;
const PriceTag = styled.h5`
	font-family: "Raleway";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	color: #1d1f22;
`;
class Category extends Component {
	state = {
		categories: [],
		selectedCategory: {},
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
					query: `
      {
        categories{
          name
          products{
            id
            name
			description
            brand
            gallery
            inStock
            attributes{
              name
              items {
                value
              }
            }
            prices{
              currency {
                symbol
                label
              }
              amount
            }
          }
        }
      }

      `,
				}),
			}
		)
			.then((response) => response.json())
			.then((results) => {
				const categories = results.data.categories;
				this.setState({ categories: categories });
			});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const category = this.props.params?.category || "all";
		const extractedCategories = this.state.categories.filter(
			(myCategory) => myCategory.name === category
		);
		if (prevState.selectedCategory?.name !== extractedCategories[0]?.name) {
			this.setState({ selectedCategory: extractedCategories[0] });
		}
	}

	componentWillUnmount() {
		this.setState({ categories: [] });
	}

	render() {
		// console.log(this.props);
		const { currency, symbol } = this.props.currencyReducer;
		const { name, products } = this.state.selectedCategory;
		return (
			<CategoryLayout>
				<CategoryName>{name || "all"}</CategoryName>
				<ProductList>
					{products?.length > 0 &&
						products.map((product) => (
							<ProductItem
								key={product.id}
								id={product.id}
								product={product}
								category={name}
								currency={currency}
								symbol={symbol}
								setProductDetails={this.props.setProductDetails}
							/>
						))}
				</ProductList>
			</CategoryLayout>
		);
	}
}
export class ProductItem extends Component {
	constructor(props) {
		super(props);
		// console.log(this.props.product.name, "=", this.props.product.inStock);
	}
	render() {
		const { id, product, category, setProductDetails, currency, symbol } =
			this.props;
		if (product?.inStock)
			return (
				<StyledLink
					to={`/${category}/${id}`}
					onClick={() => setProductDetails({ category, ...product })}>
					<StyledFigure>
						<ProductImage
							src={product.gallery[0]}
							alt={product.name}
						/>
					</StyledFigure>
					<Title>
						{product.name}
						<span>{product.brand}</span>
					</Title>
					<PriceTag>
						<strong>
							{product.prices[currency].currency.symbol}
							{product.prices[currency].amount}
						</strong>
					</PriceTag>
				</StyledLink>
			);

		return (
			<OutOfStockLink
				to={`/${category}/${id}`}
				onClick={() => setProductDetails({ category, ...product })}>
				<StyledFigure>
					<ProductImage src={product.gallery[0]} alt={product.name} />
					<h1>Out of Stock</h1>
				</StyledFigure>
				<Title>
					{product.name}
					<span>{product.brand}</span>
				</Title>
				<PriceTag>
					<strong>
						{product.prices[currency].currency.symbol}
						{product.prices[currency].amount}
					</strong>
				</PriceTag>
			</OutOfStockLink>
		);
	}
}
const mapStateToProps = (state) => ({
	...state,
});
const mapDispatchToProps = { setProductDetails };
export default connect(mapStateToProps, mapDispatchToProps)(Category);
