import { ApolloProvider } from '@apollo/client';
import React from 'react';
import './App.css';
import Game from './Game';
import Scoreboard from './Scoreboard';

import client from './Global/Graphql';

const SCOREBOARD = false;

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {SCOREBOARD ? <Scoreboard/> : <Game />}
      </div>
    </ApolloProvider>
  );
}

export default App;
