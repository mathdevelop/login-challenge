import { ApolloClient, InMemoryCache } from '@apollo/client';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache'
  },
  query: {
    fetchPolicy: 'no-cache'
  }
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER,
  cache: new InMemoryCache(),
  defaultOptions
});

export default client;