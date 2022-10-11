import React from "react";
import styled from "styled-components/macro";
import { COLORS, FONTS } from "../../components/constants";
// import ProductSample from "../../../src/assets/icons/product-image.png";

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
  height:511px;
  height:610px;
  object-fit:cover;
  flex: 3;
  
  ;
 
   > img {
    width:100%;
    height:100%;
    /* object-fit: cover; */
  }
`;

const ProductInfo = styled.article`
  flex: 2;
`;
const Gallery = styled.aside`
  display:flex;
  align-items:flex-end;
  flex-direction:column;
   width:80px;
>img {
  margin-bottom: 5px;
  cursor:pointer;
}
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
// const ProductTile = styled.aside`
//   width: 79px;
//   height: 80px;
// `;
const Size = styled.span`
  font-family: ${FONTS.FAMILIES.ROBOTO};
  font-size: ${FONTS.SIZES.TEN};
  border: 1px solid ${COLORS.BLACK};
  width: 40px;
  height: 28px;
  display: inline-block;
  margin-right:4px;
  text-align: center;
  line-height:28px;
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
  display:inline-block;
  height:36px;
  width:36px;
  margin-right:4px;
	border:1px solid gray;
	border-radius: 1px;
  cursor:pointer;
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
  // constructor(props) {
  //   super(props)
  state ={
    selectedColor : '',
    selectedSize : '',
    galleryImagePosition: 0
  }

  changeImage = position => {
  this.setState({galleryImagePosition: position})
  }
  // }

 
  render() {
    const LOCATION_PARTS = window.location.pathname.split("/");
    // console.log(location)
    // console.log(this.props.data.products.)
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
          <Gallery>
            {
              PRODUCT.gallery.map((image,index) => 
                <img key={index.toString()} src={image} onClick={() => this.changeImage(index) } width="79" height="80"/>
              )
            }
          </Gallery >

          <ProductImage>
            <img src={PRODUCT.gallery[this.state.galleryImagePosition]} alt="chosen-item" />
          </ProductImage>
          <ProductInfo>
            <h1>{PRODUCT.title}</h1>
            <h2>{PRODUCT.brand}</h2>
            <h3>Size:</h3>
            <p>
              {PRODUCT.availableSizes.map((size) =>( <Size id={size} onClick={(event)=>{ this.setState({selectedSize:event.target.id}) 
              setTimeout(()=>{
                 console.log(this.state.selectedSize)
                 },500)
                   }} key={size}>{size}</Size>))
              
              }
            
            </p>
            <ColorSwatch>
              <h3>Color:</h3>
              {PRODUCT.colors.map(color => {return <span key={color} style={{backgroundColor: color }} 
                onClick={(event) => {this.setState({selectedColor: event.target.style.backgroundColor})
                  setTimeout(()=>{
                    console.log(this.state.selectedColor)
                  },2000)
                  
                }
              }></span>

                //when the user clicks on a color swatch:
                //1. Implement an event
                //2. The event is triggered on Click of the color from the Color Swatch
                //3. The color is retrieved from the color item that has been clicked
                //4. Console the color to find out if it's the right color
                //5. Then store in the appropriate state
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
