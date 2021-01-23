import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import Cookies from 'js-cookie';

import Config from './Config';

const authToken = () => {
  return Cookies.get('token');
}

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `${authToken()}`,
      },
    });

    return forward(operation);
});

const httpLink = new HttpLink({
  uri: `http://${Config.BACKEND_HOST}:${Config.BACKEND_PORT}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${Config.BACKEND_HOST}:${Config.BACKEND_PORT}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => {
      return {
        authorization: authToken(),
      }
    }
  }
});

const protocolLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const link = from([
  authLink,
  protocolLink,
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;