import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementWrapper from "./components/utils/withRouter";
import HeaderWrapper from "./components/Header";
import GlobalStyle from "components/GlobalStyles";
import Category from "webpages/productListing/Category";
import ProductDetails from "webpages/products/ProductDetails";
import Cart from "webpages/cart/Cart";
import store from "./store";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<GlobalStyle />
				<BrowserRouter>
					<HeaderWrapper />
					<Routes>
						<Route path="/" element={<Category />} />
						<Route
							path="/:category"
							element={<ElementWrapper routeElement={Category} />}
						/>
						<Route
							path="/:category/:id"
							element={
								<ElementWrapper routeElement={ProductDetails} />
							}
						/>
						<Route path="/cart" element={<Cart />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		);
	}
}
export default App;
