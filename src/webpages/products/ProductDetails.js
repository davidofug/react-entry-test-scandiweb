import React from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
import ProductSample from "../../../src/assets/icons/product-image.png";

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

const ProductImage = styled.img`
  flex: 3;
`;

const ProductInfo = styled.article`
  flex: 2;
`;
const Gallery = styled.aside`
  flex: 1;
`;

const DescriptionText = styled.div`
  font-family: ${FONTS.FAMILIES.ROBOTO};
  font-weight: ${FONTS.WEIGHTS.MEDIUM};
  font-size:${FONTS.SIZES.SIXTEEN};
  color: ${COLORS.BLACK};
  max-width:fit-content;
`;
const AddToCartBtn = styled.button`
  background-color: ${COLORS.GREEN};
  font-family: ${FONTS.FAMILIES.RALEWAY};
  font-size: ${FONTS.SIZES.SIXTEEN};
  font-weight: ${FONTS.WEIGHTS.LARGER};
  margin-bottom:40px;
  border: none;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  color: ${COLORS.WHITE};
  text-transform: uppercase;
`;
const ProductTile = styled.aside`
  width: 79px;
  height: 80px;
`;
const Size = styled.h3`
  font-family: ${FONTS.FAMILIES.ROBOTO};
  font-size: ${FONTS.SIZES.TEN};
  border: 1px solid ${COLORS.BLACK};
  width: 32px;
  height: 16px;
  display: inline-block;
  margin-right: 5px;
  text-align: center;
  padding: 6px;
  cursor: pointer;
  

  &:hover {
    background-color: ${COLORS.BLACK};
    color: ${COLORS.WHITE};
  }
`

const ColorSwatch = styled.div`
margin-top:18px;
> h3{
  font-family:${FONTS.FAMILIES.ROBOTO_CONDENSED};
  font-weight:${FONTS.WEIGHTS.LARGER};
  font-size:${FONTS.SIZES.EIGHTEEN};
  margin-bottom:3px;
}
>span{
  height:2px;
  margin: 2px 2px;
	padding: 2px 16px;
  border:1px solid gray;
	border-radius: 1px;
}

`
const Price = styled.h3`
  font-family: ${FONTS.FAMILIES.ROBOTO_CONDENSED};
  font-weight: ${FONTS.WEIGHTS.LARGEST};
  font-size: ${FONTS.SIZES.EIGHTEEN};
  margin:10px 0;
  line-height: 18px;
  >span{
    display:block;
    margin:10px 0;
  }
`;
export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
  this.ImageSlider  = React.createRef;
  
  }
  render() {
    const LOCATION_PARTS = window.location.pathname.split("/");
    // console.log(location)
    // console.log(this.props.data)
    const [, category, id] = LOCATION_PARTS;
    // console.log(category, id)
    const CATEGORY_NAME = category.charAt(0).toUpperCase() + category.slice(1);
    const PRODUCTS_IN_CATEGORY = this.props.data.products.filter((product) =>
      product.categories.includes(CATEGORY_NAME)
    );
    // console.log(PRODUCTS_IN_CATEGORY[id])
    const PRODUCT = PRODUCTS_IN_CATEGORY[id];

    return (
      <>
        <ProductDisplayLayout>
          <Gallery ref={this.ImgSlider}>
            <ProductTile />
            {/* {
          this.state.PRODUCT.gallery?.map((image,index) => {
            return <ProductTile key= {index.toString()} id={index} gallery={image}  
          />
        }
  )} */}
          </Gallery >

          <ProductImage src={ProductSample} alt="chosen-item" />
          <ProductInfo>
            <h1>{PRODUCT.title}</h1>
            <h2>{PRODUCT.brand}</h2>
            <h3>Size:</h3>
            <p>
              {PRODUCT.availableSizes.map((size) => (
                <Size>{size}</Size>
              ))}
            </p>
            <ColorSwatch>
              <h3>Color:</h3>
              {PRODUCT.colors.map(color => {return <span key={color} style={{background: color }}></span>
              })}

            </ColorSwatch>
            <Price>
             Price:<span>${PRODUCT.price.USD}</span>
            </Price>

            <AddToCartBtn>Add To Cart</AddToCartBtn>
            <DescriptionText>
              {PRODUCT.description}
            </DescriptionText>
          </ProductInfo>
        </ProductDisplayLayout>
      </>
    );
  }
}
