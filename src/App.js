import React, { Component } from "react";
import {Provider} from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementWrapper from "./components/utils/withRouter";
import HeaderWrapper from "./components/Header";
import GlobalStyle from "components/GlobalStyles";
import Category from "webpages/productListing/Category";
import ProductDetails from "webpages/products/ProductDetails";
import Cart from "webpages/cart/Cart";
import store from './store'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
             <HeaderWrapper />
                <Routes>
                  <Route
                    path="/"
                    element={<Category default="default" />}
                  />
                  <Route path="/:category"
                    element={<Category/>}
                  />
                  <Route
                    path="/:category/:id"
                    element={<ProductDetails/>}
                  />
                  <Route path="productdetails" element={<h3>hallo</h3>} />
                  <Route path="cartPage" element={<Cart />} />
                </Routes>
        </BrowserRouter>
      </Provider>
    );
   }
  }
export default App