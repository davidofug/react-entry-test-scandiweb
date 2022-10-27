import React, { Component } from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
import CircleCartIcon from "../../assets/icons/Circle-Cart-Icon.png";
import { connect } from "react-redux";
import { fetchNavItems } from "../../actions/navActions";
import { setProductDetails } from "../../actions/productActions";
import { Link } from "react-router-dom";
const CategoryLayout = styled.main`
	box-sizing: border-box;
	overflow: hidden;
	color: ${COLORS.BLACK};
	width: 86%;
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
	margin-bottom: 80px;
	padding-top: 20px;
	padding-bottom: 30px;
`;
const ProductList = styled.div`
	position: relative;
	gap: 24px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background-color: ${COLORS.WHITE};
	padding-bottom: 40px;
`;
const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	height: 444px;
	cursor: pointer;
	padding: 16px;
	position: relative;
	text-decoration: none;
	border-radius: 5px;
	color: ${COLORS.BLACK};
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
		fetch("http://localhost:4000/graphql", {
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
            brand
            gallery
            inStock
            attributes{
              type
              name
              items{
                value
              }
            }
            prices{
              currency{
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
		})
			.then((response) => response.json())
			.then((results) => {
				const categories = results.data.categories;
				this.setState({ categories: categories });
				this.props.fetchNavItems(
					categories.map((category) => category.name)
				);
			});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log(prevState)
		const category = this.props.params?.category || "all";
		// console.log(category)
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
		console.log(this.props);
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
								setProductDetails={this.props.setProductDetails}
							/>
						))}
				</ProductList>
			</CategoryLayout>
		);
	}
}
export class ProductItem extends Component {
	render() {
		const { id, product, category, setProductDetails, navigate } =
			this.props;
		return (
			<StyledLink
				to={`/${category}/${id}`}
				onClick={() => setProductDetails({ category, ...product })}>
				<StyledFigure>
					<ProductImage src={product.gallery[0]} alt={product.name} />
				</StyledFigure>
				<Title>
					{product.name}
					<span>{product.brand}</span>
				</Title>
				<PriceTag>
					<strong>
						{product.prices[0].currency.symbol}
						{product.prices[0].amount}
					</strong>
				</PriceTag>
			</StyledLink>
		);
	}
}
const mapStateToProps = (state) => ({
	...state,
});
const mapDispatchToProps = { fetchNavItems, setProductDetails };
export default connect(mapStateToProps, mapDispatchToProps)(Category);
