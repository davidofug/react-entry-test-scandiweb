import React, { Component } from 'react'
import styled from 'styled-components/macro'
import {COLORS, FONTS} from '../../components/constants'
import CircleCartIcon from '../../assets/icons/Circle-Cart-Icon.png'
import {Link} from 'react-router-dom'
const CategoryLayout = styled.main`
    box-sizing:border-box; 
    overflow: hidden; 
    color:${COLORS.BLACK};
    width:86%;
    margin:0 auto;
    min-height:100%;
         
`
const CategoryName = styled.h1`
    font-family:${FONTS.FAMILIES.RALEWAY};
    font-size:${FONTS.SIZES.FORTY_TWO};
    font-weight:${FONTS.WEIGHTS.MEDIUM};
    font-style: normal;
    line-height:67.2px;
    text-transform:capitalize;
    margin-bottom:80px;
    padding-top:  20px;
    padding-bottom:30px;
`
const ProductList = styled.div`
    position:relative;
    gap:24px;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    background-color:${COLORS.WHITE};
    padding-bottom:40px;
  `
  const StyledLink = styled(Link)`
    display:flex;
    flex-direction:column;
    box-sizing:border-box; 
    height:444px;
    /* width:386px; */
    cursor:pointer;
    padding:16px;
    position:relative;
    text-decoration:none;
    border-radius:5px;
    color:${COLORS.BLACK};
    &:hover {
      box-shadow: 0px 4px 35px 
      rgba(168, 172, 176, 0.19);
      transition:box-shadow 400ms ease-in-out;
      }

    &::after{
        content:'';
        opacity:0;
        background-image:url(${CircleCartIcon});
        background-size:cover;
        position:absolute;
        bottom:46px;
        right: 20px;
        width: 52px;
        height:52px; 
        transition:opacity 500ms ease-in-out;
        z-index:15;
    }
    &:hover::after{
        opacity:1;
       
    }
 
`
const StyledFigure = styled.figure`
 
`
const ProductImage = styled.img`
    height:354px;
    width: 330px;
    object-fit:cover;
    
  
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
export default class Category extends Component {
    state = {
    products: this.props.data.products,
    category: "",
    categoryProducts:[],
    categories: "",
    gallery:[],
  }

  getProductsOfCategory = () =>{
    let category = this.props.default === 'default' ? 'women' : this.props.location?.pathname.replace('/',"")
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
    const category = nextProps.params?.category || 'women'
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
    <CategoryName >{this.props.location?.pathname.replace('/', "") || "Women"}</CategoryName>
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
        <StyledFigure>
          <ProductImage src={product.image} alt={product.title}/> 
         </StyledFigure>
            <Title>{product.title}</Title>
             <PriceTag><strong>${product.price.USD}</strong></PriceTag>
       </StyledLink>
              
        
    )
  }
}