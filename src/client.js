import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

 const cache = new InMemoryCache();
 const link = new HttpLink({
   uri: 'http://localhost:4000/graphql'
})
 const client = new ApolloClient({
  link,
  cache,
})

const query = gql`
{
  categories {
    name

  }
}
 `

client.query({query}) .then(result => console.log(result))
export default client
