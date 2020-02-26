import React, { Component } from 'react';

class Details extends Component {
  state = {
    beer: {
      food_pairing: []
    }
  }

  componentDidMount(){
    let id = this.props.match.params.beer_id;
    let url = `https://api.punkapi.com/v2/beers/${id}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          beer: res[0]
        })
      })
  }

  handleClick = () => {
    this.props.history.replace('/');
  }

  render(){
    const foodPair = this.state.beer.food_pairing;
    const foodPairList = foodPair.map(food => {
      return (
        <li className="Details__pairing-item">- { food }</li>
      )
    })

    return (
      <div className="Details--background-grey"  onClick={this.handleClick} id="popup">
        <div className="Details">
        
          <div className="Details-main">
            <img className="Details__img" src={ this.state.beer.image_url } alt={'Bottle of beer: ' + this.state.beer.name} />
            <section>
              <h3 className="Details__header">{ this.state.beer.name }</h3>
              <p className="Details__tag">{ this.state.beer.tagline }</p>
              <span className="Details__params"><strong>IBU:</strong> { this.state.beer.ibu }</span>
              <span className="Details__params"><strong>ABV:</strong> { this.state.beer.abv }%</span>
              <span className="Details__params"><strong>EBC:</strong> { this.state.beer.ebc }</span>
              <p className="Details__desc">{ this.state.beer.description }</p>
              <p className="Details__pairing">Best served with:</p>
              <ul className="Details__pairing-list">
                { foodPairList }
              </ul>
            </section>
          </div>

          <div className="">
            <p className="Details__another">You might also like:</p>
            {/* {
              fetch('https://api.punkapi.com/v2/beers/random')
        .then(res => res.json())
        .then(res => {
  console.log(res)
        })
            } */}
          </div>

        </div>
      </div>

    )
  } 
}

export default Details;