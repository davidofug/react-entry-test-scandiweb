// import {ApolloClient} from 'apollo-boost';
// import {HttpLink } from 'apollo-link-http';
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import gql from 'graphql-tag'
// const link = new HttpLink({uri:'http://localhost:4000/graphql'})
// const cache = new InMemoryCache()

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'cache-and-network',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
//   mutate: {
//     errorPolicy: 'all',
//   },
// };

// const client = new ApolloClient({
//   link,
//   cache,
//   defaultOptions
// });

// const query = gql`
// {
//   categories{
//   	name
//     products{
//       id
//       name
//       brand
//       gallery
//       inStock
//       attributes{
//         type
//         name
//         items{
//           value
//         }
//       }
//       prices{
//         currency{
//           symbol
//           label
//         }
//         amount
//       }
//     }
//   }
// }
//  `
// // client.query({query}).then(result => result)
// export default client
