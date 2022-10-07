import React from 'react'
import styled from 'styled-components/macro'
import {COLORS,FONTS} from '../../components/constants'
import ProductSample from '../../../src/assets/icons/product-image.png'

const ProductDisplayLayout = styled.section`
    width:86%;
    gap:20px;
    display:flex;
    margin:0 auto;
    margin-top:40px;
    padding-bottom:40px;
    color:${COLORS.BLACK};
    background-color:${COLORS.BACKGROUND.WHITE};
    font-size:${FONTS.SIZES.TWENTY_FOUR};
    
        
 `
//  const ProductViewCard = styled.div`
//     margin-top:82px;
//     display:flex;
//     height: auto;
//     border:2px solid gray;

//  `
const ProductImage = styled.img`
  flex:3;
  
       
   `

const ProductInfo = styled.article`

flex:2;

  `
const Gallery = styled.aside`
flex:1;

`

const DescriptionText = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
color: ${COLORS.BLACK};
`
 const AddToCartBtn = styled.button`
    background-color:${COLORS.GREEN};
    margin-bottom:40px;
    border:none;
    width:100%;
    padding:10px;
    cursor:pointer;
    color:${COLORS.WHITE};
    text-transform:uppercase;
 `
 const ProductTile = styled.aside`
 width:79px;
 height:80px;
 `
const Size = styled.span`
font-family:${FONTS.FAMILIES.ROBOTO};
font-size:${FONTS.SIZES.TEN};
border:1px solid ${COLORS.BLACK};
width:30px;
height:15px;
display:inline-block;
margin-right:5px;
text-align:center;
padding:4px;
cursor:pointer;

&:hover{
  background-color:${COLORS.BLACK};
  color:${COLORS.WHITE};
}
`
export default class ProductDetails extends React.Component {
    // constructor(props) {
  //   super(props)
  // }
  state ={
    gallery :[],
  }
  render() {
    const LOCATION_PARTS = window.location.pathname.split("/")
    // console.log(location)
    // console.log(this.props.data)
    const [,category,id] = LOCATION_PARTS
    // console.log(category, id)
    const CATEGORY_NAME = category.charAt(0).toUpperCase() + category.slice(1)
    const PRODUCTS_IN_CATEGORY = this.props.data.products.filter( product => product.categories.includes(CATEGORY_NAME))
    // console.log(PRODUCTS_IN_CATEGORY[id])
    const PRODUCT = PRODUCTS_IN_CATEGORY[id]
    
    return (
      <>
       <ProductDisplayLayout>
          <Gallery>
            <ProductTile/>
            {/* {
          this.state.PRODUCT.gallery?.map((image,index) => {
            return <ProductTile key= {index.toString()} id={index} gallery={image}  
          />
        }
  )} */}
            
         </Gallery>
        
        <ProductImage src={ProductSample} alt ='chosen-item'/>
          <ProductInfo>
          <h1>{PRODUCT.title}</h1>
          <h2>{PRODUCT.brand}</h2>
          <h3>Size:</h3>
          <p>{PRODUCT.availableSizes.map(size => <Size>{size}</Size>)

          }</p>
        <h3>Color</h3>
        <h3>Price:<br/>${PRODUCT.price.USD}</h3>

          <AddToCartBtn>Add To Cart</AddToCartBtn>
          <DescriptionText>
          Find stunning women's cocktail dresses and party dresses. 
          Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
          </DescriptionText>
         </ProductInfo>
        
     </ProductDisplayLayout>
    </>    
      
    )
  }
}
