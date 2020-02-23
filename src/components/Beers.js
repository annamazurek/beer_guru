import React, { Component } from 'react';

class Beers extends Component {
  state = {
    beers: [
      // "id": null,
      // "name": "",
      // "tagline": "",
      // "first_brewed": "",
      // "description":"",
      // "image_url": "",
      // "abv": null,
      // "ibu": null,
      // "target_fg": null,
      // "target_og": null,
      // "ebc": null,
      // "srm": null,
      // "ph": null,
      // "attenuation_level": null,
      // "volume": {},
      // "boil_volume": {},
      // "method": {},
      // "ingredients": {},
      // "food_pairing": [],
      // "brewers_tips": "",
      // "contributed_by": ""
    ]
  }

  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers')
      .then(res => res.json())
      .then(res => {
        res.map(beer => {
          this.setState({
            beers: [
              ...this.state.beers,
              {
              "id": beer.id,
              "name": beer.name,
              "tagline": beer.tagline,
              "first_brewed": beer.first_brewed,
              "description":beer.description,
              "image_url": beer.image_url,
              "abv": beer.abv,
              "ibu": beer.ibu,
              "target_fg": beer.target_fg,
              "target_og": beer.target_og,
              "ebc": beer.ebc,
              "srm": beer.srm,
              "ph": beer.ph,
              "attenuation_level": beer.attenuation_level,
              "volume": beer.volume,
              "boil_volume": beer.boil_volume,
              "method": beer.method,
              "ingredients": beer.ingredients,
              "food_pairing": beer.food_pairing,
              "brewers_tips": beer.brewers_tips,
              "contributed_by": beer.contributed_by
              }
            ]
          })
        })
      })
  }

  render() {
    const beers = this.state.beers;
console.log(beers)
    const beersList = beers.map(beer => {
      return (
        <li>
          <img src={ beer.image_url }/>
          <h2>{ beer.name }</h2>
          <p>{ beer.tagline }</p>
        </li>
      )
    })
// console.log(beersList)

    return (
      <div>
        <ul>
          { beersList }
        </ul>
      </div>
    );
  }
}

export default Beers;