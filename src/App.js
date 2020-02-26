import React from 'react';
import Beers from './components/Beers';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Details from './components/Details';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>BEER<span className="App-header--grey">GURU</span></h1>
        </header>
        {/* <Beers /> */}
        <Route path="/" component={Beers} />
        <Route path="/:beer_id" component={Details} />
        {/* <Route path={'/' + beer.id} /> */}

      </div>
    </BrowserRouter>

  );
}

export default App;
