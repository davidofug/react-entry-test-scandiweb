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

// import {Query} from 'react-apollo'
// import Logo from './components/UI/Logo'
// import CartIcon from './components/UI/CartIcon'
// import CircleCartIcon from './components/UI/CircleCartIcon' 

// import {ApolloProvider} from 'react-apollo'
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import client from './components/Apollo/client'

// const CATEGORIES = gql`
//   {
//     categories {
//       name
//     }
//   }
// `;
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: `
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
      
      `})
    })
      .then(response => response.json())
      .then(results => {
        this.setState({data: results.data.categories})
          console.log(results.data.categories)
      });

  }

  componentDidMount() {


  }

  render() {
    if(this.state.data.length > 0) {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          {/* <ApolloProvider client={client}> */}
            {/*<Query query={CATEGORIES}>
                ({loading, data,error}) => {
                  console.log(data)
                  if(loading) return <p>Loading ...</p>
                  if(error) return <p>An error occured</p>

                  if(!loading) {
                  return (
                    <>
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
                    </>
                  )
                      }
                }
            </Query>*/}
                  <HeaderWrapper />
                    <Routes>
                      <Route
                        path="/"
                        element={<Category data={this.state.data} default="default" />}
                      />
                      <Route
                        path="/:category"
                        element={
                          <ElementWrapper
                            data={this.state.data}
                            routeElement={Category}
                          />
                        }
                      />
                      <Route
                        path="/:category/:id"
                        element={<ProductDetails data={this.state.data} />}
                      />
                      <Route path="productdetails" element={<h3>hallo</h3>} />
                      <Route path="cartPage" element={<h4>Fine</h4>} />
                    </Routes>
          {/* </ApolloProvider> */}

        </BrowserRouter>
      </>
    );
  }

  return(<>
      <h1>Initializing app</h1>
      <p>Please Wait...</p>
    </>)

}

}
export default App;
