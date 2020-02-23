import React from 'react';
import Beers from './components/Beers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BEER<span className="App-header--grey">GURU</span></h1>
        <Beers />
      </header>
    </div>
  );
}

export default App;
