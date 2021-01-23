import { ApolloProvider } from '@apollo/client';
import React from 'react';
import './App.css';
import Game from './Game';

import client from './Global/Graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Game />
      </div>
    </ApolloProvider>
  );
}

export default App;
