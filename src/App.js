import React, { Component } from "react";
// import styled from 'styled-components/macro'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementWrapper from "./components/utils/withRouter";
import HeaderWrapper from "./components/Header";
// import Category from 'webpages/productListing/Category';
import GlobalStyle from "components/GlobalStyles";
// import ProductDetails from 'webpages/products/ProductDetails';
import Category from "webpages/productListing/Category";
import ProductDetails from "webpages/products/ProductDetails";

// import Logo from './components/UI/Logo'
// import CartIcon from './components/UI/CartIcon'
// import CircleCartIcon from './components/UI/CircleCartIcon'

class App extends Component {
  componentDidMount() {
    // console.log(this.props.data)
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
                
         <HeaderWrapper />
          <Routes>
            <Route
              path="/"
              element={<Category data={this.props.data} default="default" />}
            />
            <Route
              path="/:category"
              element={
                <ElementWrapper
                  data={this.props.data}
                  routeElement={Category}
                />
              }
            />
            <Route
              path="/:category/:id"
              element={<ProductDetails data={this.props.data} />}
            />
            <Route path="productdetails" element={<h3>hallo</h3>} />
            <Route path="cartPage" element={<h4>Fine</h4>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
export default App;
