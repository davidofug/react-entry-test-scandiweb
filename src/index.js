import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloProvider} from 'react-apollo'
import client from './components/Apollo/client'
// import gql from 'graphql-tag'
import data from './data.json'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App data={data} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
