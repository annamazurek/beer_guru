import React from 'react';
import Beers from './components/Beers';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>BEER<span className="App-header--grey">GURU</span></h1>
        </header>
        <Route path="/" component={Beers} />
        <Route path="/:beer_id" component={Details} />
      </div>
    </BrowserRouter>

  );
}

export default App;
