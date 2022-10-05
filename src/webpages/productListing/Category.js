import React, { Component } from 'react'
import styled from 'styled-components/macro'
import {COLORS, FONTS} from '../../components/constants'
import CircleCartIcon from '../../assets/icons/Circle-Cart-Icon.png'
import {Link} from 'react-router-dom'

const CategoryLayout = styled.main`
    box-sizing:border-box; 
    color:${COLORS.BLACK};
    min-height:100%;
    width:1440px;
    padding-left:100px;
    padding-right:102px;
`
const CategoryName = styled.h1`
    font-family:${FONTS.FAMILIES.RALEWAY};
    font-size:${FONTS.SIZES.FORTY_TWO};
    font-weight:${FONTS.WEIGHTS.MEDIUM};
    font-style: normal;
    line-height:67.2px;
    text-transform:capitalize;
    margin-bottom:60px;
    padding-top:  20px;
    padding-bottom:30px;
`
const ProductList = styled.div`
    position:relative;
    gap:10px;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    background-color:${COLORS.WHITE}
  `
  
const StyledLink = styled(Link)`
    display:flex;
    flex-direction:column;
    box-sizing:border-box; 
    width:386px;
    height:444px;
    cursor:pointer;
    padding:16px;
    position:relative;
    text-decoration:none;
    color:${COLORS.BLACK};
    &:hover {
      box-shadow: 0px 4px 35px 
      rgba(168, 172, 176, 0.19);
      transform:scaleY(1);
    }
    &::after{
        content:'';
        opacity:0;
        background-image:url(${CircleCartIcon});
        background-size:cover;
        position:absolute;
        bottom:46px;
        right: 45px;
        width: 52px;
        height:52px; 
    }
    &:hover::after{
        opacity:1;
        transition:ease-in-out;
        z-index:15;
    }
 
`
const ProductImage = styled.img`
    height:354px;
    width: 330px;
  
`
const Title = styled.h4`
    margin-top:14px;
    font-family: 'Raleway';
    font-style: normal;
    color:${COLORS.BLACK};
    font-weight:300;
    font-size: 18px;
`
const PriceTag = styled.h5`
    font-family: 'Raleway';
    font-style: normal;
    font-weight:500;
    font-size: 18px;
    color: #1D1F22;
`
/* const AddToCartIcon = styled.img`
    width: 52px;
    height:52px;
    display:none;
    position:absolute;
    bottom:48px;
    right: 44px;
    
` */

export default class Category extends Component {
    state = {
    products: this.props.data.products,
    category: "",
    categoryProducts:[],
    categories: ""
  }
  getProductsOfCategory = () =>{
    let category = this.props.location.pathname.replace('/',"")
    category = category.charAt(0).toUpperCase() + category.slice(1);
    this.setState({category: category.toLowerCase()})
    const products = this.state.products.filter((product)=> product.categories.includes(category))
    // console.log(products)
    this.setState({categoryProducts:[...products]})
        
  }
  componentDidMount() {
  
    this.getProductsOfCategory()
  }
  shouldComponentUpdate(nextProps, prevState){
    // console.log(prevState)
    const category = nextProps.params?.category
    let newCategory = category.charAt(0).toUpperCase() + category.slice(1);
    // console.log(newCategory)
    const products = this.state.products.filter((product)=> product.categories.includes(newCategory))
    // console.log(products)
    prevState.categoryProducts = [...products]
    // this.getProductsOfCategory()
    return true
  }
  componentWillUnmount(){
    this.setState({category: '',categoryProducts: []})
  }
    render() {
     return (
      
   <CategoryLayout>
    <CategoryName >{this.props.location.pathname.replace('/', "")}</CategoryName>
           <ProductList> {
          this.state.categoryProducts.map((product,index) => {
            return <ProductItem key={index.toString()} id={index} product={product} category={this.state.category} 
            />
          })
        }
        </ProductList>
   </CategoryLayout>
    )
  }
}
  export class ProductItem extends Component {
    render(){
      const {id,product,category} = this.props
       return (
        <StyledLink to={`/${category}/${id}`}>
          <ProductImage src={product.image} alt={product.title}/> 
            <Title>{product.title}</Title>
             <PriceTag><strong>${product.price.USD}</strong></PriceTag>
       </StyledLink>
              
        
    )
  }
}