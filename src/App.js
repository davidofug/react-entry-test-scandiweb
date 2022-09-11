

import React, { Component } from 'react'
// import styled from 'styled-components/macro'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ApolloClient, InMemoryCache,gql,Query } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://localhost:4000/graphql',
  cache: new InMemoryCache()
});




 class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <ApolloProvider client={apolloClient}>
      {console.log(apolloClient)}
      <Routes>
       <Route path ='categorypage'        element ={<h2>Hi</h2>}/>
        <Route path ='productdisplaypage'  element ={<h3>hallo</h3>}/>
        <Route path ='cartPage'            element ={<h4>Fine</h4>}/>
      </Routes>
      </ApolloProvider>
      </BrowserRouter>
      
    )
  }
}

export default App