import React, { Component } from 'react'
import styled from 'styled-components/macro'
import {COLORS, FONTS} from '../../components/constants'
  const CategoryLayout = styled.main`
    box-sizing:border-box;
    color:${COLORS.BLACK};
    max-height:1513px;
    max-width:1440px;
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
    padding-top:30px;
    padding-bottom:30px;
`
  const ProductList = styled.div`
   display:flex;
   flex-wrap:wrap;
   gap:20px;



  `
  export default class Category extends Component {
    state = {
    products: this.props.data.products,
    categoryProducts:[],
    categories: ""
  }
  getProductsOfCategory = () =>{
    let category = this.props.location.pathname.replace('/',"")
    category = category.charAt(0).toUpperCase() + category.slice(1);
      // this.setState({category:category})
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
        <ProductList> {this.state.categoryProducts.map((product,index) => <div key ={index.toString()}>
        <figure>
        <img src ={product.image} width='356' height ='338' alt={product.title}/>
        </figure>
        <p>{product.title} </p>
        <p><strong>${product.price.USD}</strong></p>
        
        
        </div>)}</ProductList>
       </CategoryLayout>
    )
  }
}
